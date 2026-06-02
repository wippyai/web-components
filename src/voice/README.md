# wippy-swiss/voice — `<wippy-voice-orb>`

Animated voice input/output widget. Handles the full voice loop: speech-to-text, session management, and text-to-speech. Self-contained — no props required. Connects to the host app via the Wippy proxy.

**STT providers:** `deepgram` (default, cloud, low latency) · `whisper` (local WASM, offline-capable)

**TTS providers:** `deepgram` (default) · `elevenlabs`

## Props

None — the component is fully self-contained and driven by the proxy session context.

## Backend requirements

Needs three API endpoints wired to an authenticated router:
- `POST /voice/ask` — session + agent routing
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
      value: app:authenticated_api
    - name: env_storage
      value: app:env_storage
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

The Whisper STT path bundles ONNX Runtime and a Whisper transcriber worker (~130 MB). The Whisper model is downloaded on first activation and cached in the browser. ORT WASM files are loaded from CDN (`cdn.jsdelivr.net`) on demand.
