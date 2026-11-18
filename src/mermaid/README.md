# wippy-swiss/mermaid — `<wippy-mermaid>`

Renders Mermaid diagrams with [Pele](https://pele.run/). It loads on first use and shows an inline error if it cannot render a diagram. The component disables diagram links and images. See [Pele compatibility](https://pele.run/compatibility) for supported syntax and layout differences.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `definition` | string | `""` | Mermaid diagram source. Use real line breaks or `&#10;` in HTML. |
| `transparent` | boolean | `true` | Transparent background. Set `false` to render on a solid card. |

## Node fills

The default Pele theme fills many nodes with `--pele-surface`. The component maps that token and `--pele-bg` to Wippy’s `--p-content-background`. On a matching background, nodes such as pills can look like outlines. A different surface color makes the existing fills visible without changing the shapes.

## Example

```html
<wippy-mermaid definition="flowchart LR
  Start([User opens app]) --> Auth{Token present?}
  Auth -- yes --> Home[Home screen]
  Auth -- no  --> Login[Login form]"></wippy-mermaid>

<wippy-mermaid definition="sequenceDiagram
  participant U as User
  participant S as Server
  U->>S: POST /login
  S-->>U: 200 OK + token"></wippy-mermaid>

<wippy-mermaid
  definition="pie title Traffic sources
    &quot;Organic&quot; : 52
    &quot;Direct&quot;  : 28
    &quot;Referral&quot;: 20"
  transparent="false"></wippy-mermaid>
```

## Dependency declaration

```yaml
- name: wc-mermaid
  kind: ns.dependency
  component: wippy-swiss/mermaid
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway
```
