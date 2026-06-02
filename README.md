# web-components

Independently publishable Wippy web component modules under the `wippy-swiss` organization. Each module ships a single auto-registered custom element — drop it into any app via `ns.dependency`, wire one `server` requirement to your gateway, and the tag is available on the next start.

## Modules

| Module | Tag | Description |
|--------|-----|-------------|
| [wippy-swiss/mermaid](src/mermaid/README.md) | `<wippy-mermaid>` | Mermaid v11 diagram renderer |
| [wippy-swiss/markdown](src/markdown/README.md) | `<wippy-markdown>` | GitHub-Flavored Markdown to safe HTML |
| [wippy-swiss/chartjs](src/chartjs/README.md) | `<wippy-chartjs>` | Chart.js v4 universal chart wrapper |
| [wippy-swiss/voice](src/voice/README.md) | `<wippy-voice-orb>` | Animated voice widget with STT and TTS |

## Local development

### Testing against an app template

Add replacements in your app's `wippy.lock` to use local source instead of the published modules:

```yaml
replacements:
  - from: wippy-swiss/mermaid
    to: ../web-components/src/mermaid
  - from: wippy-swiss/markdown
    to: ../web-components/src/markdown
  - from: wippy-swiss/chartjs
    to: ../web-components/src/chartjs
  - from: wippy-swiss/voice
    to: ../web-components/src/voice
```

### Building

```bash
cd src/mermaid/frontend && pnpm run build
cd src/markdown/frontend && pnpm run build
cd src/chartjs/frontend && pnpm run build
cd src/voice/frontend && pnpm run build
```

### Repository structure

```
web-components/
├── src/
│   ├── mermaid/     # _index.yaml, wippy.yaml, wippy.lock, frontend/, public/
│   ├── markdown/    # same layout
│   ├── chartjs/     # same layout
│   └── voice/       # same layout + env/ sub-module + Lua backend files
├── wippy.lock       # root lock (src: ./src)
└── wippy.exe        # Wippy CLI (gitignored)
```
