# web-components

A Wippy module repository providing reusable web component modules — similar in structure to `wippy-framework` (`C:/Projects/wippy-framework`). This repo publishes Wippy modules containing frontend web components and any supporting Lua backend glue. It has **no own facade or gateway** and must be tested through an external app template.

---

## Docs & Knowledge Sources

**Most documentation lives in two places — check these first before guessing:**

1. **`wippy-kb` MCP** (`mcp__wippy-kb__*`) — structured Wippy KB with full-text and semantic search. Use `wippy-kb` tools for any Wippy-specific question (APIs, module kinds, entry types, lifecycle, config keys). This is cheaper and faster than web search.
2. **`C:/Projects/app-template-raw`** — the reference app integrating these components. Its `CLAUDE.md`, `README.md`, and `frontend/docs/` contain frontend architecture guides, build instructions, web component patterns, and the view-registration pattern.
3. **Wippy web docs fallback**: `https://wippy.ai/llms.txt` (index) or `https://wippy.ai/llms-full.txt`

---

## Testing This Repo

This repo has no standalone server or facade. To test modules from this repo against a real Wippy runtime, use **`C:/Projects/app-template-raw`** as the host:

### Local Replacement Workflow

1. Add a `replacements:` block in `app-template-raw/wippy.lock` pointing to this repo's module source:
   ```yaml
   replacements:
     - from: your-org/your-module
       to: ../web-components/src/your-module
   ```
2. Run the app-template-raw stack (see its CLAUDE.md for `make build` + `make run`).
3. Wippy loads your local source instead of the published hub version.

Replacement paths are **relative to the wippy.lock file location** in app-template-raw.

### gen-2-chat (Local Wippy Host)

For testing the chat/host UI layer, a locally running Wippy Web Host is at `C:/Projects/gen-2-chat`. The app-template-raw E2E tests expect it running on `:5173`.

Start sequence for full-stack local dev:
1. Start wippy server: `make run` inside `app-template-raw/` (serves on `:8085` by default)
2. Start gen-2-chat dev server: `pnpm dev` inside `gen-2-chat/` (`:5173`)
3. Override facade URL if needed: `-o wippy.facade:fe_facade_url:default=http://localhost:5173`

---

## Module Structure

Follow the same patterns as `C:/Projects/wippy-framework`. Two layouts exist:

### Flat Package (simple modules, no internal test isolation)
```
src/<module>/
  _index.yaml        # All entry definitions
  wippy.yaml         # Publication manifest
  wippy.lock         # Dependency lock
  .wippy/            # Downloaded dependencies (gitignored)
  *.lua              # Source files
  test/              # Optional inline test project
```

### Src Package (modules with separate test project)
```
src/<module>/
  src/
    _index.yaml
    wippy.yaml
    wippy.lock
    .wippy/
    *.lua
  test/
    wippy.yaml
    wippy.lock        # Has replacements: pointing back to src/
    *.lua
```

### Every Module Must Have

- One `ns.definition` entry in `_index.yaml`
- `wippy.yaml` with `organization`, `module`, `description`, `license`
- Dependencies declared as `ns.dependency` entries (never assumed ambient)

---

## Web Component Conventions (from app-template-raw patterns)

Frontend web components follow the `wippy-component-1.0` specification:

**`package.json` key fields:**
```json
{
  "name": "@your-org/component-name",
  "specification": "wippy-component-1.0",
  "browser": "dist/index.js",
  "wippy": {
    "tagName": "your-org-component-name",
    "type": "widget",
    "props": { "prop-name": { "type": "string", "default": "" } },
    "events": { "event-name": { "fieldName": "string" } }
  }
}
```

**Two base classes (from `@wippy-fe` packages):**
- `WippyElement` — Shadow DOM, host CSS loading, prop parsing
- `WippyVueElement` — Vue 3 mounting, reactive props, typed events, Pinia support

**Build output**: each component builds to a separate `dist/` (or `static/wc/<name>/`). The bundle is served by a Wippy registry entry declaring `base_path` and `entry_point`.

**Only create web components for cross-module reuse.** For app-internal shared UI, use regular Vue components instead — web components have overhead (separate build, Shadow DOM, prop serialization, registry entry).

---

## Running Wippy

```bash
./wippy.exe run -c          # Connect mode (use with app template)
./wippy.exe run             # Standalone
```

Common overrides:
```bash
-o app:gateway:addr=:8086   # Change port (default :8080 or :8085)
-o wippy.facade:fe_facade_url:default=http://localhost:5173
```

**Before starting**: run `bg_list` to check if a wippy instance is already running and `bg_kill` it first.

---

## Entry Kind Reference (quick lookup)

| Kind | Purpose |
|------|---------|
| `ns.definition` | Module identity (one per module) |
| `ns.dependency` | Declares dependency on external module |
| `ns.requirement` | Injection point that apps must satisfy |
| `library.lua` | Shared Lua library |
| `function.lua` | Callable function / test |
| `process.lua` | Long-running process |
| `registry.entry` | Generic registry entry (e.g. `type: view.page`) |
| `http.service` | HTTP server |
| `http.router` | HTTP route group |
| `http.endpoint` | HTTP handler |

For the full list and field details, query the `wippy-kb` MCP.

---

## Publishing

Each module is published independently:
```bash
./wippy.exe publish         # From the module's src/ or flat directory
```

- Entries with `meta.type: test` or `meta.scope: dev` are excluded from publish.
- Lock files pin exact versions with SHA-256 hashes — commit them.
- Never edit `.wippy/vendor/` directly; it is managed by `wippy update`.

---

## Related Projects

| Project | Path | Role |
|---------|------|------|
| `wippy-framework` | `C:/Projects/wippy-framework` | Reference for module patterns (actor, agent, llm, facade, views, etc.) |
| `app-template-raw` | `C:/Projects/app-template-raw` | Primary test harness; docs on FE architecture, build, E2E tests |
| `gen-2-chat` | `C:/Projects/gen-2-chat` | Local Wippy Web Host (chat UI, served on `:5173` in dev) |
