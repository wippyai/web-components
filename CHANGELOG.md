# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [0.2.0](https://github.com/wippyai/web-components/compare/v0.1.0...v0.2.0) (2026-11-18)


### Features

* **chartjs:** emit chart-click and fill the element's height ([8204c61](https://github.com/wippyai/web-components/commit/8204c61c73b3dc6141b2af40b05d483eeb61d21c))
* **chartjs:** emit chart-click for clicked data elements ([7d47955](https://github.com/wippyai/web-components/commit/7d47955f239185af1acc872897ba98b049992979))
* **mermaid:** use Pele as the sole renderer ([8b1f80a](https://github.com/wippyai/web-components/commit/8b1f80ab9e4aa8fc27ecfebef644ae56857bf1d3))
* refresh Swiss kit and ship standalone Voice Orb ([#6](https://github.com/wippyai/web-components/issues/6)) ([dd092c7](https://github.com/wippyai/web-components/commit/dd092c7174789c45738aa7faabbe288c43b6aa15))
* **voice:** integrate Attention and microphone controls ([7664e4d](https://github.com/wippyai/web-components/commit/7664e4d809c454f6f6d0a97a90a4ed8923349f01))


### Bug Fixes

* **chartjs:** fill the host element's box ([1f5c564](https://github.com/wippyai/web-components/commit/1f5c564c8d3556301c5f3ab81079b9d3cf38091c))
* **chartjs:** wrap the events schema and prefer a point's own x ([f3286ee](https://github.com/wippyai/web-components/commit/f3286ee057e14e3ea10fd12e023a631e25feb4e3))
* **ci:** use the Swiss kit checks before release-please ([#7](https://github.com/wippyai/web-components/issues/7)) ([07a2965](https://github.com/wippyai/web-components/commit/07a296560b2390562d17cb9f174e52bc883b96f6))
* **markdown:** refresh the live host allowlist ([a7cd482](https://github.com/wippyai/web-components/commit/a7cd482d15ddc996bbeb9cd332d2a60e5f62d2ee))
* **voice:** check the ElevenLabs token response body before decoding ([d16b972](https://github.com/wippyai/web-components/commit/d16b9725c2b51d0ff77789686956af24952b8230))
* **voice:** preserve the selected agent across page routing ([6096e74](https://github.com/wippyai/web-components/commit/6096e749b257bf0d99e9fa9915e1c88b3ffb78ab))
* **voice:** resolve the standalone module’s registry entries ([#9](https://github.com/wippyai/web-components/issues/9)) ([a97fa5d](https://github.com/wippyai/web-components/commit/a97fa5dd71eb178d19c67e92c3a2c2eaceb851ef))
* **voice:** send through the authenticated Web Host relay ([#10](https://github.com/wippyai/web-components/issues/10)) ([a8997b5](https://github.com/wippyai/web-components/commit/a8997b5d7529fdc14bff6e8b9d7faf5671f64255))

## 0.1.0 (2026-07-09)


### Features

* **ci:** adopt release-please for automated releases ([#2](https://github.com/wippyai/web-components/issues/2)) ([e9dc1a3](https://github.com/wippyai/web-components/commit/e9dc1a3f6b0212427b3fa63c4d9bb10d7f977c6a))

## [Unreleased]

### Added

- `wippy-swiss/voice` — `<wippy-voice-orb>` web component. Animated voice widget
  with STT (Deepgram / Whisper WASM) and TTS (Deepgram / ElevenLabs). Includes backend
  Lua API endpoints (`ask`, `tts-token`, `pages`) as supporting glue. Provider selection
  and credentials are configured via environment variables.

---

## [0.1.0] — 2026-05-26

### Added

- `wippy-swiss/mermaid` — `<wippy-mermaid>` web component. Renders Mermaid v11
  diagrams with a fast primary engine (flowchart, sequence, class, ER, state, xychart)
  and a lazy-loaded fallback for all other types (pie, gantt, mindmap, timeline,
  gitGraph, sankey, …).

- `wippy-swiss/markdown` — `<wippy-markdown>` web component. Renders
  GitHub-Flavored Markdown to sanitized HTML via markdown-it + sanitize-html.
  Conservative default allowlist; widening via `allowed-tags` / `allowed-attributes`
  is supported but a security decision.

- `wippy-swiss/chartjs` — `<wippy-chartjs>` web component. Renders any Chart.js v4
  chart type (line, bar, doughnut, pie, radar, polarArea, scatter, bubble) from a
  single tag. Auto-fills dataset colors from the host's CSS palette.

- Each module is independently versioned and publishable under the `wippy-swiss`
  organization, with its own `_index.yaml`, `wippy.yaml`, `wippy.lock`, and `Makefile`.

- Root `Makefile` delegates `build`, `lint`, `lint-fix`, `clean`, `clean-build` to
  per-module Makefiles via `$(MAKE) -C src/<name>`.

- GitHub Actions CI (`ci.yml`) — matrix lint job (Node 20, `npm ci` + `npm run lint`)
  on push/PR to `main`.

- GitHub Actions publish (`publish.yml`) — matrix publish job via
  `wippyai/action-module-release@main` on GitHub release.
