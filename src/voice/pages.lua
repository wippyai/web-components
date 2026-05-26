-- voice pages endpoint: returns page→agent mapping from registry
-- frontend fetches this once on mount to know which agent handles each page
local http = require("http")
local json = require("json")
local security = require("security")
local agents = require("agents")
local start_tokens = require("start_tokens")

local function handler()
    local res = http.response()

    local actor = security.actor()
    if not actor then
        res:set_status(http.STATUS.UNAUTHORIZED)
        res:write_json({ success = false, error = "authentication required" })
        return
    end

    local page_agents = agents.build_page_agents()
    local page_routes = agents.build_page_routes()

    local pages: {[string]: any} = {}
    for page, agent_id in pairs(page_agents) do
        pages[page] = {
            agent = agent_id,
            route = page_routes[page] or ("/" .. page),
        }
    end

    -- include default agent start_token — system resolves model automatically
    local default_agent = agents.get_default_agent()
    local token = ""
    if default_agent and default_agent ~= "" then
        token = start_tokens.pack({ agent = default_agent })
    end

    res:write_json({ success = true, pages = pages, start_token = token, default_agent = default_agent })
end

return { handler = handler }
