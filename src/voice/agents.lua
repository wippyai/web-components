-- voice agent resolution: fully abstract, zero domain knowledge
-- uses the agent registry for proper class-based queries
local registry = require("registry")
local agent_registry = require("agent_registry")

-- find the default agent (class: primary)
local function get_default_agent(): string
    local agents, err = agent_registry.list_by_class("primary")
    if err or not agents or #agents == 0 then
        return ""
    end
    return agents[1].id or ""
end

-- discover page→agent mapping from registry (meta.pages)
local function build_page_agents(): {[string]: string}
    local entries, err = registry.find({
        [".kind"] = "registry.entry",
        ["meta.type"] = "agent.gen1",
    })
    if err or not entries then return {} end

    local result: {[string]: string} = {}
    for _, entry in ipairs(entries) do
        if entry.meta and entry.meta.pages and type(entry.meta.pages) == "table" then
            for page, _ in pairs(entry.meta.pages) do
                result[tostring(page)] = entry.id
            end
        end
    end
    return result
end

-- discover page→route mapping from registry (meta.pages values)
local function build_page_routes(): {[string]: string}
    local entries, err = registry.find({
        [".kind"] = "registry.entry",
        ["meta.type"] = "agent.gen1",
    })
    if err or not entries then return {} end

    local result: {[string]: string} = {}
    for _, entry in ipairs(entries) do
        if entry.meta and entry.meta.pages and type(entry.meta.pages) == "table" then
            for page, route in pairs(entry.meta.pages) do
                result[tostring(page)] = tostring(route)
            end
        end
    end
    return result
end

-- find entity agent by content type (meta.entry_type)
local function find_entity_agent(entry_type: string): string?
    local entries, err = registry.find({
        [".kind"] = "registry.entry",
        ["meta.type"] = "agent.gen1",
        ["meta.entry_type"] = entry_type,
    })
    if err or not entries or #entries == 0 then
        return nil
    end
    return entries[1].id
end

-- resolve agent for a page with optional entity type
-- priority: entity_type agent → page agent → default
local function resolve_agent(page: string?, entity_type: string?): string
    local default_agent = get_default_agent()

    if not page or page == "" then
        return default_agent
    end

    if entity_type then
        local agent = find_entity_agent(entity_type)
        if agent then return agent end
    end

    local page_agents = build_page_agents()
    return page_agents[page] or default_agent
end

-- resolve agent for navigation: page + optional entity type
local function resolve_for_navigation(page: string, entity_type: string?): string
    return resolve_agent(page, entity_type)
end

-- list all available agents with metadata
local function list_available_agents(): {any}
    local entries, err = registry.find({
        [".kind"] = "registry.entry",
        ["meta.type"] = "agent.gen1",
    })
    if err or not entries then return {} end

    local result = {}
    for _, entry in ipairs(entries) do
        if entry.meta and entry.meta.title then
            table.insert(result, {
                id = entry.id,
                title = entry.meta.title,
                comment = entry.meta.comment,
                entry_type = entry.meta.entry_type,
                pages = entry.meta.pages,
            })
        end
    end
    return result
end

-- validate agent exists in registry as agent.gen1
local function is_valid_agent(agent_id: string): boolean
    local entry, err = registry.get(agent_id)
    if not entry or err then return false end
    return entry.meta and entry.meta.type == "agent.gen1"
end

-- validate and sanitize context payload from frontend
local function validate_context(ctx: any): {page: string?, params: {[string]: string}?}?
    if not ctx or type(ctx) ~= "table" then
        return nil
    end

    local page = ctx.page
    if not page or type(page) ~= "string" then
        return nil
    end

    local params: {[string]: string} = {}
    if ctx.params and type(ctx.params) == "table" then
        for k, v in pairs(ctx.params) do
            if type(k) == "string" and type(v) == "string" then
                params[k] = v
            end
        end
    end

    return {
        page = tostring(page),
        params = params,
    }
end

return {
    get_default_agent = get_default_agent,
    resolve_agent = resolve_agent,
    resolve_for_navigation = resolve_for_navigation,
    build_page_agents = build_page_agents,
    build_page_routes = build_page_routes,
    list_available_agents = list_available_agents,
    is_valid_agent = is_valid_agent,
    validate_context = validate_context,
}
