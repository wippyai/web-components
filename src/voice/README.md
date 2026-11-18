# wippy-swiss/voice — `<wippy-voice-orb>`

The Voice Orb uses the Wippy proxy for speech-to-text, session management, and playback.

**STT providers:** `deepgram` (default, cloud, low latency) · `whisper` (local WASM, offline-capable)

**TTS providers:** `deepgram` (default) · `elevenlabs`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `attention-context-enabled` | boolean | `false` | Includes Attention context with voice and typed messages when the host provides it. |
| `agent-name` | string | | Registry name of the voice agent. When omitted, Voice follows the page-to-agent mapping. |

## Backend requirements

Needs three API endpoints wired to an authenticated router:
- `POST /voice/ask` prepares the selected agent and message for the authenticated Web Host session relay
- `POST /voice/tts-token` — TTS/STT credential provisioning
- `GET /voice/pages` — page-to-agent mapping

## Example

```html
<wippy-voice-orb />
```

## Dependency declaration

```yaml
- name: wc-voice
  kind: ns.dependency
  component: wippy-swiss/voice
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway
    - name: router
      value: app:api
    - name: env_storage
      value: app.env:store
```

## Environment variables

Configure via the `env_storage` requirement:

| Variable | Description |
|----------|-------------|
| `TTS_PROVIDER` | `deepgram` or `elevenlabs` (default: `deepgram`) |
| `STT_PROVIDER` | `deepgram` or `whisper` (default: `deepgram`) |
| `DEEPGRAM_API_KEY` | Deepgram API key for STT and TTS |
| `DEEPGRAM_MODEL` | Deepgram TTS voice model (default: `aura-asteria-en`) |
| `ELEVENLABS_API_KEY` | ElevenLabs API key |
| `ELEVENLABS_VOICE_ID` | ElevenLabs voice ID |
| `ELEVENLABS_MODEL_ID` | ElevenLabs model ID (default: `eleven_flash_v2_5`) |

## Notes

The release build includes the Whisper transcriber worker and Silero voice activity assets. The browser downloads and caches the selected Whisper model on first activation. ONNX Runtime loads matching WASM files from `cdn.jsdelivr.net` on demand.
