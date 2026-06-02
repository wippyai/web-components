# wippy-swiss/chartjs — `<wippy-chartjs>`

Renders any [Chart.js v4](https://www.chartjs.org/) chart type from a single tag. All built-in registerables are pre-loaded. Dataset colors are auto-filled from the host's CSS palette (`--p-primary-500`, `--p-danger-500`, `--p-warn-500`, `--p-secondary-500`, `--p-accent-500`) when not specified.

**Supported types:** `line`, `bar`, `doughnut`, `pie`, `radar`, `polarArea`, `scatter`, `bubble`

## Props

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

## Example

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

## Dependency declaration

```yaml
- name: wc-chartjs
  kind: ns.dependency
  component: wippy-swiss/chartjs
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway
```
