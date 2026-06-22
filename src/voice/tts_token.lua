local http = require("http")
local json = require("json")
local env = require("env")
local security = require("security")
local http_client = require("http_client")
local api_error = require("api_error")

local NS = "voice.env:"

local function get_tts_config()
    local provider = env.get(NS .. "tts_provider") or "deepgram"

    if provider == "elevenlabs" then
        local api_key = env.get(NS .. "elevenlabs_api_key")
        if not api_key or api_key == "" then
            return nil, "ElevenLabs API key not configured"
        end

        local voice_id = env.get(NS .. "elevenlabs_voice_id")
        if not voice_id or voice_id == "" then
            return nil, "ElevenLabs voice not configured"
        end

        local resp, err = http_client.post("https://api.elevenlabs.io/v1/single-use-token/tts_websocket", {
            headers = { ["xi-api-key"] = api_key },
        })

        if err or not resp or resp.status_code ~= 200 then
            return nil, "ElevenLabs token request failed"
        end

        local body = json.decode(resp.body)
        if not body or not body.token then
            return nil, "invalid ElevenLabs token response"
        end

        return {
            provider = "elevenlabs",
            token = body.token,
            voice_id = voice_id,
            model_id = env.get(NS .. "elevenlabs_model_id") or "eleven_flash_v2_5",
        }
    end

    local api_key = env.get(NS .. "deepgram_api_key")
    if not api_key or api_key == "" then
        return nil, "Deepgram API key not configured"
    end

    return {
        provider = "deepgram",
        token = api_key,
        model_id = env.get(NS .. "deepgram_model") or "aura-asteria-en",
    }
end

local function get_stt_config()
    local provider = env.get(NS .. "stt_provider") or "whisper"
    if provider ~= "deepgram" then
        return { provider = "whisper" }
    end

    local api_key = env.get(NS .. "deepgram_api_key")
    if not api_key or api_key == "" then
        return { provider = "whisper" }
    end

    return {
        provider = "deepgram",
        token = api_key,
    }
end

local function handler()
    local res = http.response()

    local actor = security.actor()
    if not actor then
        res:set_status(http.STATUS.UNAUTHORIZED)
        res:write_json({ success = false, error = "authentication required" })
        return
    end

    local tts, tts_err = get_tts_config()
    if not tts then
        api_error.fail(res, http.STATUS.INTERNAL_ERROR, tts_err, nil)
        return
    end

    local stt = get_stt_config()

    res:write_json({
        success = true,
        tts = tts,
        stt = stt,
    })
end

return { handler = handler }
