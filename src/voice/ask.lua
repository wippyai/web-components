-- voice ask endpoint: abstract, zero domain knowledge
-- receives text + page context from frontend
-- resolves agent via contract + registry, sends context + message to session
local http = require("http")
local json = require("json")
local security = require("security")
local time = require("time")
local logger = require("logger"):named("voice")
local contract = require("contract")

local session = require("session")
local context = require("context")
local agents = require("agents")
local start_tokens = require("start_tokens")

local AGENT_RESOLVER = "voice:agent_resolver"

local function gen_message_id(): string
    return "voice-msg-" .. tostring(time.now():unix()) .. "-" .. tostring(time.now():nanosecond() % 10000)
end

-- resolve the best agent for a page context
-- first tries the app-specific contract, then falls back to page-level registry lookup
local function resolve_agent_for_context(page_ctx): string
    -- try app-specific resolver contract (handles entity types, etc.)
    local def, def_err = contract.get(AGENT_RESOLVER)
    if not def then
        logger:warn("agent_resolver contract not found", { error = tostring(def_err) })
    else
        local c, open_err = def:open()
        if not c then
            logger:warn("agent_resolver contract open failed", { error = tostring(open_err) })
        else
            local result, call_err = c:resolve({ page = page_ctx.page, params = page_ctx.params })
            if call_err then
                logger:warn("agent_resolver call failed", { error = tostring(call_err) })
            elseif result and result.success and result.agent_id then
                return tostring(result.agent_id)
            else
                logger:debug("agent_resolver returned no agent", { result = result })
            end
        end
    end

    -- fall back to page-level agent from registry
    return agents.resolve_agent(page_ctx.page)
end

local function handler()
    local res = http.response()
    local req = http.request()

    local actor = security.actor()
    if not actor then
        res:set_status(http.STATUS.UNAUTHORIZED)
        res:write_json({ success = false, error = "authentication required" })
        return
    end

    local user_id = actor:id()

    local body = req:body()
    if not body or body == "" then
        res:set_status(http.STATUS.BAD_REQUEST)
        res:write_json({ success = false, error = "request body is required" })
        return
    end

    local input, decode_err = json.decode(body)
    if decode_err then
        res:set_status(http.STATUS.BAD_REQUEST)
        res:write_json({ success = false, error = "invalid JSON" })
        return
    end

    if not input.text or input.text == "" then
        res:set_status(http.STATUS.BAD_REQUEST)
        res:write_json({ success = false, error = "text is required" })
        return
    end

    local hub_pid = session.get_hub(user_id)
    if not hub_pid then
        res:set_status(http.STATUS.INTERNAL_ERROR)
        res:write_json({ success = false, error = "user hub not found" })
        return
    end

    local session_id = input.session_id and tostring(input.session_id) or nil
    local start_token = input.start_token and tostring(input.start_token) or nil
    local page_ctx = agents.validate_context(input.context)

    if session_id and page_ctx and page_ctx.page then
        -- existing session: switch agent if page changed, update context
        if input.context and input.context.agent_changed then
            local target_agent = resolve_agent_for_context(page_ctx)
            if agents.is_valid_agent(target_agent) then
                local ok, err = session.switch_agent(hub_pid, session_id, target_agent)
                if not ok then
                    logger:warn("agent switch failed", { error = tostring(err), agent = target_agent })
                end
            end
        end

        -- write raw page context to session
        local serialized = context.serialize(page_ctx)
        if serialized and serialized ~= "" then
            local ok, err = session.write_context(hub_pid, session_id, context.CONTEXT_KEY, serialized)
            if not ok then
                logger:warn("context write failed", { error = tostring(err) })
            end
        end
    elseif not session_id and page_ctx and page_ctx.page then
        -- new session: resolve agent and pack start_token
        local target_agent = resolve_agent_for_context(page_ctx)
        logger:info("new session agent resolution", {
            page = page_ctx.page,
            params = page_ctx.params,
            resolved_agent = target_agent,
        })
        if target_agent and target_agent ~= "" then
            -- pack context directly into start_token — available at session creation
            local serialized = context.serialize(page_ctx)
            local init_context = {}
            if serialized and serialized ~= "" then
                init_context[context.CONTEXT_KEY] = serialized
            end
            start_token = start_tokens.pack({
                agent = target_agent,
                context = init_context,
            })
        end
    end

    -- send the user message
    local message_id = gen_message_id()
    local metadata: {[string]: any} = { input_type = "voice" }

    local ok, send_err = session.send_message(
        hub_pid, session_id, start_token,
        message_id, tostring(input.text), metadata
    )

    if not ok then
        res:set_status(http.STATUS.INTERNAL_ERROR)
        res:write_json({ success = false, error = "send failed: " .. tostring(send_err) })
        return
    end

    res:write_json({ success = true, message_id = message_id })
end

return { handler = handler }
