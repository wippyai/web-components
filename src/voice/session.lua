-- The Web Host sends these commands through its authenticated session relay.
local function command(session_id: string, data: {[string]: any}): {[string]: any}
    return {
        type = "session_command",
        session_id = session_id,
        data = data,
    }
end

local function message(session_id: string?,
    message_id: string, text: string, metadata: {[string]: any}?, file_uuids: {string}?,
    context_attachments_ref: {[string]: any}?, runtime_context: {[string]: any}?): {[string]: any}

    local payload: {[string]: any} = {
        type = "session_message",
        session_id = session_id,
        message_id = message_id,
        request_id = message_id,
        data = {
            text = text,
            file_uuids = file_uuids or {},
            metadata = metadata or {},
        },
    }

    if context_attachments_ref then
        payload.data.context_attachments_ref = context_attachments_ref
    end

    if runtime_context then
        payload.data.runtime_context = runtime_context
    end

    return payload
end

return {
    command = command,
    message = message,
}
