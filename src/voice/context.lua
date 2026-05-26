-- voice context module: abstract, zero domain knowledge
-- passes raw page context to session, formatting is the agent's responsibility
local json = require("json")

local CONTEXT_KEY = "page_context"

-- serialize raw page context for session storage
-- no DB queries, no entity resolution, no formatting
local function serialize(ctx)
    if not ctx then return "" end
    local encoded, err = json.encode(ctx)
    if not err then return encoded end
    return ""
end

-- check if context has meaningfully changed
local function changed(prev, current)
    if not prev and not current then return false end
    if not prev or not current then return true end
    if type(prev) == "table" and type(current) == "table" then
        if prev.page ~= current.page then return true end
        if prev.route ~= current.route then return true end
        local prev_id = prev.params and prev.params.id
        local curr_id = current.params and current.params.id
        if prev_id ~= curr_id then return true end
    end
    return false
end

return {
    serialize = serialize,
    changed = changed,
    CONTEXT_KEY = CONTEXT_KEY,
}
