local json = require("json")
local logger = require("logger"):named("voice.session")

local USER_HUB_PREFIX = "user."

-- send a session command through the normal ws.message protocol
local function send_command(hub_pid: string, session_id: string?, cmd: {[string]: any}): (boolean, string?)
    local payload: {[string]: any} = {
        type = "session_command",
        data = cmd,
    }
    if session_id and session_id ~= "" then
        payload.session_id = session_id
    end

    local msg = json.encode(payload)
    local ok, err = process.send(hub_pid, "ws.message", msg)
    if not ok then
        logger:warn("failed to send session command", { command = cmd.command, error = tostring(err) })
        return false, tostring(err)
    end
    return true, nil
end

-- write a context key to the session
local function write_context(hub_pid: string, session_id: string?, key: string, data: string): (boolean, string?)
    return send_command(hub_pid, session_id, {
        command = "context",
        action = "write",
        key = key,
        data = data,
    })
end

-- delete a context key from the session
local function delete_context(hub_pid: string, session_id: string, key: string): (boolean, string?)
    return send_command(hub_pid, session_id, {
        command = "context",
        action = "delete",
        key = key,
    })
end

-- switch the session's active agent
local function switch_agent(hub_pid: string, session_id: string, agent_id: string): (boolean, string?)
    return send_command(hub_pid, session_id, {
        command = "agent",
        name = agent_id,
    })
end

-- send a user message to the session
local function send_message(hub_pid: string, session_id: string?, start_token: string?,
    message_id: string, text: string, metadata: {[string]: any}?): (boolean, string?)

    local payload: {[string]: any} = {
        type = "session_message",
        message_id = message_id,
        request_id = message_id,
        data = {
            text = text,
            file_uuids = {},
            metadata = metadata or {},
        },
    }

    if session_id then
        payload.session_id = session_id
    end

    if start_token then
        payload.start_token = start_token
    end

    local msg = json.encode(payload)
    local ok, err = process.send(hub_pid, "ws.message", msg)
    if not ok then
        logger:warn("failed to send message", { error = tostring(err) })
        return false, tostring(err)
    end
    return true, nil
end

-- lookup user hub PID
local function get_hub(user_id: string): string?
    return process.registry.lookup(USER_HUB_PREFIX .. user_id)
end

return {
    send_command = send_command,
    write_context = write_context,
    delete_context = delete_context,
    switch_agent = switch_agent,
    send_message = send_message,
    get_hub = get_hub,
}
