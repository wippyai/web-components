# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added

- `wippy-wc-extras/voice` — `<wippy-voice-orb>` web component. Animated voice widget
  with STT (Deepgram / Whisper WASM) and TTS (Deepgram / ElevenLabs). Includes backend
  Lua API endpoints (`ask`, `tts-token`, `pages`) as supporting glue. Provider selection
  and credentials are configured via environment variables.

---

## [0.1.0] — 2026-05-26

### Added

- `wippy-wc-extras/mermaid` — `<wippy-mermaid>` web component. Renders Mermaid v11
  diagrams with a fast primary engine (flowchart, sequence, class, ER, state, xychart)
  and a lazy-loaded fallback for all other types (pie, gantt, mindmap, timeline,
  gitGraph, sankey, …).

- `wippy-wc-extras/markdown` — `<wippy-markdown>` web component. Renders
  GitHub-Flavored Markdown to sanitized HTML via markdown-it + sanitize-html.
  Conservative default allowlist; widening via `allowed-tags` / `allowed-attributes`
  is supported but a security decision.

- `wippy-wc-extras/chartjs` — `<wippy-chartjs>` web component. Renders any Chart.js v4
  chart type (line, bar, doughnut, pie, radar, polarArea, scatter, bubble) from a
  single tag. Auto-fills dataset colors from the host's CSS palette.

- Each module is independently versioned and publishable under the `wippy-wc-extras`
  organization, with its own `_index.yaml`, `wippy.yaml`, `wippy.lock`, and `Makefile`.

- Root `Makefile` delegates `build`, `lint`, `lint-fix`, `clean`, `clean-build` to
  per-module Makefiles via `$(MAKE) -C src/<name>`.

- GitHub Actions CI (`ci.yml`) — matrix lint job (Node 20, `npm ci` + `npm run lint`)
  on push/PR to `main`.

- GitHub Actions publish (`publish.yml`) — matrix publish job via
  `wippyai/action-module-release@main` on GitHub release.
