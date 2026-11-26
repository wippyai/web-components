# wippy-swiss/echarts, `<wippy-echarts>`

Renders [Apache ECharts 6.1](https://echarts.apache.org/) charts from a JSON option. ECharts is pinned to 6.1.0 and imported through `echarts/core` with explicit registrations.

**Supported types:** `line`, `bar`, `pie` (including doughnut charts using `radius`), `scatter`, `heatmap`, `funnel`, `gauge`, `radar`.

Includes grid, tooltip, legend, dataset, aria, title, inside and slider dataZoom, markLine, markPoint, markArea, visualMap, calendar and radar coordinates. Both Canvas and SVG renderers are available. Toolbox, maps, graph and sankey are excluded.

## Lazy loading

The registry declares `announced: true` and `auto_register: false`. The Web Host does not load this component on every page. Consumers register it explicitly before rendering the tag:

```ts
import { loadByTagName } from '@wippy-fe/proxy'

await loadByTagName('wippy-echarts')
```

Registration loads the small element entry. A cached dynamic import loads the separate ECharts engine chunk only when a valid chart has a nonzero container size. With `lazy-init="true"`, initialization also waits until the element is within 200px of the viewport. Without IntersectionObserver, initialization proceeds when sized. Concurrent charts share the same engine import. Disconnecting before import completion prevents initialization.

The host-injected `<wippy-loading no-bg>` overlays the reserved box during the first engine load and while `loading` is true. `loading-text` supplies its title. The figure has `aria-busy="true"` while the overlay is visible. Errors use an absolute alert in the same box. Neither overlay changes its size.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | string | `""` | Complete desired ECharts option as JSON, in both merge modes. Never a patch. Empty means `{}`. |
| `theme-mode` | `auto` / `light` / `dark` | `auto` | Auto follows the host. Light/dark override ECharts contrast mode locally; host CSS tokens remain authoritative. |
| `palette` | string | `""` | JSON array of color strings, such as `["#2563EB","#0D9488"]`. Overrides CSS palette slots. |
| `renderer` | `canvas` / `svg` | `canvas` | Rendering backend. Changing it recreates the chart from the current full option and resets interaction state. |
| `autoresize` | boolean | `true` | Resize with the container. |
| `loading` | boolean | `false` | Show the platform loading overlay inside the chart box. |
| `loading-text` | string | `Loading…` | Platform loader title, including during the first engine load. |
| `not-merge` | boolean | `true` | How to apply a new full option to the live chart. True replaces; false uses native ECharts merge. |
| `lazy-update` | boolean | `false` | Defer the option update until the next animation frame. |
| `group` | string | `""` | ECharts connect group id. Empty removes group membership. |
| `label` | string | `""` | Accessible figure name. Empty uses the first non-empty option title text, then `Chart`. |
| `lazy-init` | boolean | `false` | Wait near the viewport before loading and initializing the engine. |

**Notes:**

- `options` must be a JSON object. Invalid options or palette JSON, import failures and initialization errors show an overlay alert and emit `chart-error`. JSON strings are never evaluated as functions or code. Use the built-in declarative formatters below for formatting callbacks. Extensions cannot be passed through JSON.
- The chart fills the height its container gives it; without a container height, it keeps a 2:1 shape. Set `height` or `aspect-ratio` on the element to change it.
- `options` is always the complete desired chart option, following the vue-echarts contract. Every update must include the axes, series, datasets and other settings needed to initialize a fresh chart. The element does not retain patches or construct a merged caller option. Pending updates before the engine loads, visibility or size allow rendering use only the latest full option, in both modes.
- Each changed `options` string calls `setOption` with the sanitized full option. The default `not-merge="true"` passes `{ notMerge: true, lazyUpdate }`. With `not-merge="false"`, it passes `{ notMerge: false, lazyUpdate }`, which uses ECharts' native merge so data updates can animate and user zoom and legend selection can persist. Omit explicit zoom ranges and legend selections when the engine should keep the user's choices; supplying them applies those settings again. Repeated identical input is ignored; changing `not-merge` reapplies the current input.
- Native merge can keep components omitted from a later full option. To remove old series or settings reliably, use `not-merge="true"`. `replaceMerge` is not exposed as a prop or `setOption` argument. Empty input means `{}` and clears a chart only in replacement mode. Disconnect disposes the chart and releases observers and host subscriptions.
- Boolean HTML attributes use the Wippy prop bridge. Use `autoresize="false"` or `not-merge="false"` to disable a default-true setting; removing the attribute restores its declared default.
- Escape inner quotes when embedding JSON in HTML attributes. Only the listed chart types and components are included.
- Tooltips always use ECharts `richText`, including nested series and data-item tooltips. A caller's `renderMode: "html"` is overridden. Templates and names remain text, so HTML tags and event handlers cannot become DOM elements. HTML markup in templates is displayed as text. Tooltip colors and fonts still use the host theme.
- Link options accept `http:`, `https:`, `mailto:` and relative URLs. Unsupported schemes and invalid values are cleared with a console warning, including title `link`/`sublink` and nested node links. Clearing also removes a previously merged link.

## Declarative formatters

Use an object containing only `"$format"` wherever ECharts accepts a formatter callback. The component replaces descriptors with built-in functions before `setOption`, including nested arrays, series lists and per-data labels. Supported positions include `tooltip.valueFormatter`, `tooltip.formatter`, `tooltip.axisPointer.label.formatter`, `xAxis` and `yAxis` `axisLabel.formatter` and `axisPointer.label.formatter`, global `axisPointer.label.formatter`, and series `label.formatter`.

| Spec | Result |
| --- | --- |
| `number` | Locale grouping and up to three fraction digits. |
| `number:<n>` | Exactly `n` fraction digits, from 0 to 20. |
| `compact` | Locale compact notation with up to one fraction digit, such as `1.4M`. |
| `percent` | A fraction as a percentage with up to one fraction digit. `0.123` becomes `12.3%`. |
| `integer` | Locale grouping, rounded to zero fraction digits. |
| `date` | Locale calendar date without time. |
| `datetime` | Locale date and time, including seconds. |
| `month` | Locale month name and year. |
| `time:<template>` | ECharts time tokens, such as `time:{yyyy}-{MM}-{dd}`, `time:{MMM} {yyyy}` or `time:{HH}:{mm}`. |

Locale comes from the document's `lang`, then the browser locale. Invalid language tags fall back to the browser. Month names in time templates also follow the locale. Date parsing uses ECharts' utility, so date-only strings keep their local calendar date. `useUTC: true` selects UTC display for dates and time templates. Use `baseOption.useUTC` for wrapped options, or root `useUTC` for ordinary options. Every full option must include the intended UTC setting.

Callbacks accept a scalar or ECharts params containing `value`. Array values format each dimension and join with a comma and space. Choose scalar data when a label should display only one dimension. Missing values display as empty text, and invalid numeric or date strings remain text. Built-in `tooltip.formatter` output is text in the enforced `richText` renderer. Existing ECharts string templates and time formatter dictionaries remain supported. Unknown or malformed descriptors produce a console warning and are omitted so ECharts uses its default formatting. No JSON text is evaluated as code.

For an axis-trigger tooltip on a time axis, set the pointer label formatter to format the header. ECharts 6.1 uses `axisPointer.label.formatter` for the header even when the pointer label is hidden. `tooltip.valueFormatter` only formats the series values, and `axisLabel.formatter` only formats axis ticks. Use `xAxis.axisPointer.label.formatter` for an override that applies to a single axis.

```json
{
  "tooltip": {
    "trigger": "axis",
    "valueFormatter": { "$format": "number:1" },
    "axisPointer": { "label": { "formatter": { "$format": "date" } } }
  },
  "xAxis": { "type": "time", "axisLabel": { "formatter": { "$format": "time:{MMM} {dd}" } } },
  "yAxis": { "type": "value" },
  "series": [{ "type": "line", "data": [["2026-11-20", 1234.5], ["2026-11-21", 1400]] }]
}
```

The tooltip header displays a locale date such as `11/20/2026`, without `00:00:00`.

## Theme

The shadow root requests `themeConfigUrl`. Text uses `--p-text-color`, muted text uses `--p-text-muted-color`, borders and axes use `--p-content-border-color`, and tooltip and calendar surfaces use `--p-content-background`. The chart background is transparent. Font family uses only the host's computed font. Values are read from the custom element host so explicit token overrides survive inner theme-root defaults. The component does not redefine host tokens or toggle theme classes.

Palette precedence is an explicit `palette` JSON array, then each resolved `--wippy-chart-1` through `--wippy-chart-8` slot, then the fallback for each unset slot. The fallback is decorative category coding with no severity meaning and is shared by both modes:

`#2563EB`, `#0D9488`, `#7C3AED`, `#DB2777`, `#0891B2`, `#65A30D`, `#9333EA`, `#D55E00`.

The final slot is [Okabe-Ito vermillion](https://jfly.uni-koeln.de/color/). Its contrast is 3.87:1 on white and 4.48:1 on `#1c1a19`. The first three colors are blue, teal and violet. Use labels or patterns alongside color when series must be distinguished without color vision.

Auto reads `host.getThemeMode()` and subscribes to the official `@theme` event. The Wippy base owns theme application to the element and its inner theme root. Operating-system changes apply when the host is in Auto. Application-wide changes use `host.setThemeMode('auto' | 'light' | 'dark')` from `@wippy-fe/proxy`.

Resolved theme token or palette changes dispose the chart, initialize a new instance with the new theme, and apply the current full option once. Series and text colors follow the new theme, and explicit caller colors remain authoritative. The element never restores a theme-resolved `getOption()` snapshot.

The component reads resolved tokens once per host `@theme` or `@config` change, or local `palette` or `theme-mode` change. It listens to system color preference changes only when both host and component use Auto. It uses no theme mutation observers or polling. Custom CSS and variable updates must follow the host configuration event path. Equal theme values do not recreate the chart. The local `theme-mode` override changes ECharts' `darkMode` contrast behavior, not the host's tokens or application-wide mode.

Theme and renderer changes deliberately reset user interaction state, including zoom and legend selection, to the current full option's settings in both merge modes. Theme switches are expected to be rare, user-initiated actions. Pie selection, highlights, transient tooltips and media effects accumulated through earlier resizing also reset. Media queries are evaluated afresh at the current container size. Recreation can restart animations and emit rendering events. Error recovery and reconnection also initialize from the current full option. `lazy-update` is honored for initialization and live updates.

Tooltips render through ECharts inside the shadow root, using Canvas or SVG with the chart. `appendTo` and `appendToBody` are ignored. `tooltip.confine` and `aria.enabled` default to `true`, and the option can override either default.

Defaults are applied to every full option, inside `baseOption` when present or at the root otherwise. Keep explicit ARIA and confinement overrides in each full option. Tooltip `renderMode` remains `richText` in base, media, series and data-item options.

## Differences from direct ECharts

- Input is always a complete JSON option string. Native patch calls and arbitrary functions are unavailable; predefined `$format` descriptors supply callbacks. Only the registered features listed above are available. `replaceMerge` and other native `setOption` arguments beyond `notMerge` and `lazyUpdate` are not exposed.
- Replacement defaults to true, while direct ECharts defaults to merge. False uses native live merging, including retention of omitted components. Identical input is skipped; a merge-mode change reapplies it. The latest full option wins during lazy loading. No patch history or lifetime update limits exist.
- Theme, palette and renderer changes dispose and recreate from the current full option. Zoom, legend selection and other interaction or accumulated media state reset deliberately. Animations can restart and rendering events can fire again. Recovery and reconnection also use the current full option.
- Host tokens and palette supply the theme. The element manages size, optional viewport initialization, engine loading, loading UI, group connection and the documented event bridge. The native instance and arbitrary engine APIs are not exposed.
- ARIA and tooltip confinement default on for each full option, including `baseOption`; explicit values override those defaults. Tooltips always use richText and cannot append outside the chart. Links accept only HTTP, HTTPS, mailto and relative URLs. Invalid JSON, palette, import and initialization errors show an alert and emit `chart-error`.

## Events

| Event | Detail | When |
|-------|--------|------|
| `chart-click` | `{ label, datasetLabel, datasetIndex, dataIndex, value }` | The user clicks a data element. Empty space emits nothing. |
| `chart-dblclick` | Same data detail | Double-click on a data element. |
| `chart-hover` | Same data detail | Mouseover on a data element. |
| `legend-change` | `{ selected: Record<string, boolean> }` | Legend selection changes. |
| `datazoom` | `{ start: number \| null, end: number \| null }` | First affected zoom range, in percent. A value-based action that omits percentages produces null fields. |
| `chart-rendered` | `{}` | The next ECharts `finished` after a requested option update or recreation, once animations, progressive rendering and lazy updates finish. Hover and resize redraws alone emit nothing. |
| `chart-error` | `{ message: string }` | JSON parse, engine import or chart initialization error. |

Every event bubbles and is composed, so listeners outside the shadow root receive it. Pointer event detail matches `<wippy-chartjs>`. `label` is the category or x value as text. `datasetLabel` is the series name, and `datasetIndex` is the series index. `dataIndex` is the index within that series. `value` is the raw data point or dataset row, including the whole object when one was provided. The Wippy base also emits its standard lifecycle events.

Pending option updates coalesce until the next `finished` event, which emits `chart-rendered` once and clears the pending request. Repeated identical options and loading-only changes do not request a render.

The canvas data elements have no keyboard interaction. A page that acts on `chart-click` should offer the same action through a keyboard control, such as a select. Aria descriptions are enabled by default.

```js
el.addEventListener('chart-click', (e) => {
  const { label, datasetLabel, value } = e.detail
})
```

## Example

```html
<wippy-echarts
  options='{"tooltip":{},"legend":{},"xAxis":{"type":"category","data":["Q1","Q2","Q3","Q4"]},"yAxis":{},"series":[{"type":"bar","name":"Revenue","data":[12,19,7,22]}]}'></wippy-echarts>

<wippy-echarts
  options='{"xAxis":{"type":"category","data":["Jan","Feb","Mar"]},"yAxis":{},"series":[{"type":"line","name":"Users","data":[100,150,180]}]}' />

<wippy-echarts
  options='{"tooltip":{},"legend":{},"series":[{"type":"pie","radius":["40%","70%"],"data":[{"name":"Chrome","value":63},{"name":"Safari","value":18},{"name":"Other","value":19}]}]}' />
```

## Dependency declaration

```yaml
- name: wc-echarts
  kind: ns.dependency
  component: wippy-swiss/echarts
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway
```

## Development

From `src/echarts/frontend`, run `pnpm install`, `pnpm run build`, `pnpm run lint`, `pnpm run typecheck` and `pnpm run test`. The build writes to `../public`, which the module embeds as `public_files`.

`src/chart-dom.test.ts` runs the actual ECharts engine and SVG renderer in happy-dom. It renders tooltip payloads, clicks title links with an inert `window.open` spy, and verifies disposal and theme repainting in both modes. `src/chart-native.test.ts` compares full-option live merges with direct ECharts and checks zoom and legend preservation during data updates, deliberate interaction resets on theme changes, current media definitions, base defaults and recovery. Controller tests cover long update streams and renderer recreation. Loading tests verify that only the latest full option initializes the chart. Formatter tests cover UTC at the root and inside `baseOption`.

`e2e/echarts.spec.ts` uses the repo's external app harness. The running app must declare `wc-echarts` and replace `wippy-swiss/echarts` with this worktree's `src/echarts`. It also needs the host and credentials described in `e2e/playwright.config.ts`. From `e2e`, run `pnpm test echarts.spec.ts` after that setup.

After verification, remove `frontend/node_modules` before starting a Wippy app with this local replacement. Pnpm dependency symlinks inside a replaced module can prevent Wippy startup.

## Bundle size

Measured with Node `gzipSync`, each file compressed independently, in the production build on 2026-11-26:

| Chunk | Raw bytes | Gzip bytes |
| --- | ---: | ---: |
| Element entry `index.js` | 38,936 | 12,287 |
| Lazy ECharts engine | 1,075,722 | 296,758 |

The lazy engine includes the registered chart types, components and declarative formatter support. Formatter resolution and ECharts time utilities remain behind the dynamic import. Adding chart types or components requires a new size measurement.

Externals match `src/chartjs`: `vue`, `pinia`, `@iconify/vue`, `@wippy-fe/proxy`. Wippy component base packages remain bundled, as required by the FE skill. Theme CSS is delivered through `hostCssKeys`, rather than duplicating default token declarations in the entry. Production resolves ECharts' environment checks at build time because direct browser consumers have no Node `process` global. `build:debug` preserves development checks. `emptyOutDir` removes obsolete hashed chunks on each build.

## Adding chart types

Edit `frontend/src/app/echarts.ts`. Import each installer from `echarts/charts` or `echarts/components`, then add it to `use([...])`. Keep imports behind the existing dynamic loader; do not import the full `echarts` package from the entry.

For maps, add `MapChart`, `GeoComponent`, and export `registerMap` from `echarts/core`. Register trusted GeoJSON in code before rendering; the current JSON-only prop contract does not register maps or fetch remote assets. For graph or sankey, add `GraphChart` or `SankeyChart`. For toolbox, add `ToolboxComponent`. Update descriptions, tests and size measurements after changing registrations. Options cannot install code, plugins or missing chart types.
