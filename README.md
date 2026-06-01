# web-components

A collection of independently publishable Wippy web component modules. Each module ships a single auto-registered custom element — drop it into any app via `ns.dependency`, wire one `server` requirement to your gateway, and the tag is available on the next start.

All modules are under the `wippy-swiss` organization and serve their static bundles under `/@static-wippy-swiss/<name>/`.

---

## Modules

### `wippy-swiss/mermaid` — `<wippy-mermaid>`

Renders any [Mermaid v11](https://mermaid.js.org/) diagram. A fast primary engine handles the common types; less-common types fall back to the full mermaid library loaded lazily on first use.

**Fast path** (primary engine, synchronous): flowchart, sequenceDiagram, classDiagram, stateDiagram, erDiagram, xychart

**Fallback** (lazy-loaded on first use): journey, gantt, pie, mindmap, timeline, gitGraph, quadrantChart, requirementDiagram, sankey, block, packet, kanban, architecture, radar

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `definition` | string | `""` | Mermaid v11 diagram source. Newlines must be real LF characters — `\n` literals are not decoded by the HTML parser. |
| `transparent` | boolean | `true` | Transparent background. Set `false` to render on a solid card. |

**Example:**

```html
<wippy-mermaid definition="flowchart LR
  Start([User opens app]) --> Auth{Token present?}
  Auth -- yes --> Home[Home screen]
  Auth -- no  --> Login[Login form]" />

<wippy-mermaid definition="sequenceDiagram
  participant U as User
  participant S as Server
  U->>S: POST /login
  S-->>U: 200 OK + token" />

<wippy-mermaid
  definition="pie title Traffic sources
    &quot;Organic&quot; : 52
    &quot;Direct&quot;  : 28
    &quot;Referral&quot;: 20"
  transparent="false" />
```

**Dependency declaration:**

```yaml
- name: wc-mermaid
  kind: ns.dependency
  component: wippy-swiss/mermaid
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway
```

---

### `wippy-swiss/markdown` — `<wippy-markdown>`

Renders [GitHub-Flavored Markdown](https://github.github.com/gfm/) to safe HTML using [markdown-it](https://github.com/markdown-it/markdown-it) and [sanitize-html](https://github.com/apostrophecms/sanitize-html). The default allowlist is conservative and safe for arbitrary input.

**Supported:** headings, bold/italic, links, images, ordered/unordered lists (nested), tables with alignment, fenced code blocks with language hints, inline code, blockquotes, strikethrough, autolinks, horizontal rules.

**Not supported by default:** GFM task lists (`- [x]`), footnotes (require extra markdown-it plugins not bundled here).

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | string | `""` | Markdown source text (GFM). |
| `allowed-tags` | string[] | `[]` | Override the sanitizer tag allowlist. Empty = built-in defaults. **Security: only widen for trusted input.** |
| `allowed-attributes` | string | `""` | JSON-stringified `{tag: [attr, ...]}` map for sanitize-html. Empty = defaults. |

**Example:**

```html
<wippy-markdown content="# Hello world
This is **bold**, *italic*, and a [link](https://example.com)." />

<wippy-markdown content="## Feature list
- Fast rendering
- Safe by default
- Theme-aware" />

<wippy-markdown content="| Name  | Role    |
|:------|--------:|
| Alice | Admin   |
| Bob   | Viewer  |" />
```

**Dependency declaration:**

```yaml
- name: wc-markdown
  kind: ns.dependency
  component: wippy-swiss/markdown
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway
```

---

### `wippy-swiss/chartjs` — `<wippy-chartjs>`

Renders any [Chart.js v4](https://www.chartjs.org/) chart type from a single tag. All built-in registerables are pre-loaded. Dataset colors are auto-filled from the host's CSS palette (`--p-primary-500`, `--p-danger-500`, `--p-warn-500`, `--p-secondary-500`, `--p-accent-500`) when not specified.

**Supported types:** `line`, `bar`, `doughnut`, `pie`, `radar`, `polarArea`, `scatter`, `bubble`

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | enum | `"doughnut"` | Chart type (see list above). |
| `data` | string | `""` | JSON-stringified [Chart.js Data object](https://www.chartjs.org/docs/latest/general/data-structures.html): `{ labels?, datasets: [{label?, data, ...}] }` |
| `options` | string | `""` | JSON-stringified [Chart.js Options object](https://www.chartjs.org/docs/latest/general/options.html) (optional). |
| `plugins` | string | `""` | JSON-stringified array of Chart.js plugin definitions (optional). |

**Notes:**
- `data` must be valid JSON. Parse errors render as an inline error banner.
- Size the chart via its wrapper element — the canvas is responsive by default (e.g. `style="height:300px"`).
- Escape inner quotes carefully when embedding JSON in HTML attributes.

**Example:**

```html
<wippy-chartjs
  type="bar"
  data='{"labels":["Q1","Q2","Q3","Q4"],"datasets":[{"label":"Revenue","data":[12,19,7,22]}]}'
  options='{"plugins":{"title":{"display":true,"text":"2026 Revenue"}}}' />

<wippy-chartjs
  type="line"
  data='{"labels":["Jan","Feb","Mar","Apr"],"datasets":[{"label":"Users","data":[100,150,180,210]}]}' />

<wippy-chartjs
  type="doughnut"
  data='{"labels":["Chrome","Safari","Firefox","Edge"],"datasets":[{"data":[63,18,4,15]}]}' />

<wippy-chartjs
  type="radar"
  data='{"labels":["Speed","Reliability","Comfort","Safety"],"datasets":[
    {"label":"Model A","data":[8,9,7,8]},
    {"label":"Model B","data":[7,8,9,7]}]}' />
```

**Dependency declaration:**

```yaml
- name: wc-chartjs
  kind: ns.dependency
  component: wippy-swiss/chartjs
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway
```

---

### `wippy-swiss/voice` — `<wippy-voice-orb>`

Animated voice input/output widget. Handles the full voice loop: speech-to-text, session management, and text-to-speech. Self-contained — no props required. Connects to the host app via the Wippy proxy.

**STT providers:** `deepgram` (default, cloud, low latency) · `whisper` (local WASM, offline-capable)

**TTS providers:** `deepgram` (default) · `elevenlabs`

**Props:** None — the component is fully self-contained and driven by the proxy session context.

**Backend requirements:** Needs three API endpoints wired to an authenticated router:
- `POST /voice/ask` — session + agent routing
- `POST /voice/tts-token` — TTS/STT credential provisioning
- `GET /voice/pages` — page-to-agent mapping

**Example:**

```html
<wippy-voice-orb />
```

**Dependency declaration:**

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

> **Note:** The voice module bundles ONNX Runtime and a Whisper transcriber worker (~130 MB of WASM/JS). These are gitignored — run `cd src/voice && make build` before first use or after a fresh clone.

---

## Using multiple modules together

Each module is an independent `ns.dependency`. Declare them all and wire each to the same gateway:

```yaml
# src/app/deps/_index.yaml

- name: wc-mermaid
  kind: ns.dependency
  component: wippy-swiss/mermaid
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway

- name: wc-markdown
  kind: ns.dependency
  component: wippy-swiss/markdown
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway

- name: wc-chartjs
  kind: ns.dependency
  component: wippy-swiss/chartjs
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway
```

All four tags (`<wippy-mermaid>`, `<wippy-markdown>`, `<wippy-chartjs>`, `<wippy-voice-orb>`) will be auto-registered and available in any page or artifact.

---

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

Paths are relative to the `wippy.lock` file.

### Building

Each module builds its frontend bundle into `src/<name>/public/` (embedded as `fs.directory`):

```bash
# Single module — from the module directory
cd src/mermaid && make build

# All modules — from repo root (requires make)
make build

# Without make — run npm directly
cd src/mermaid/frontend && npm run build
cd src/markdown/frontend && npm run build
cd src/chartjs/frontend && npm run build
cd src/voice/frontend && npm run build
```

### Linting

```bash
# Single module
cd src/mermaid && make lint

# All modules
make lint

# Without make
cd src/mermaid/frontend && npm run lint
cd src/markdown/frontend && npm run lint
cd src/chartjs/frontend && npm run lint
cd src/voice/frontend && npm run lint
```

---

## Repository structure

```
web-components/
├── src/
│   ├── mermaid/
│   │   ├── _index.yaml      # Wippy module definition (namespace, fs, static, registry entry)
│   │   ├── wippy.yaml       # Publication manifest
│   │   ├── wippy.lock       # Dependency lock
│   │   ├── Makefile         # build / lint / clean for this module
│   │   ├── frontend/        # Vue 3 + TypeScript source
│   │   └── public/          # Built bundle (embedded, served at /@static-wippy-swiss/mermaid/)
│   ├── markdown/            # Same layout
│   ├── chartjs/             # Same layout
│   └── voice/               # Same layout + env/ sub-module + Lua backend files
├── Makefile                 # Root — delegates to per-module Makefiles
├── wippy.lock               # Root lock (src: ./src — discovers all modules)
└── wippy.exe                # Wippy CLI (gitignored — copy from wippy-framework)
```
