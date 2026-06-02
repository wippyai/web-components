# wippy-swiss/mermaid — `<wippy-mermaid>`

Renders any [Mermaid v11](https://mermaid.js.org/) diagram. A fast primary engine handles the common types; less-common types fall back to the full mermaid library loaded lazily on first use.

**Fast path** (primary engine, synchronous): flowchart, sequenceDiagram, classDiagram, stateDiagram, erDiagram, xychart

**Fallback** (lazy-loaded on first use): journey, gantt, pie, mindmap, timeline, gitGraph, quadrantChart, requirementDiagram, sankey, block, packet, kanban, architecture, radar

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `definition` | string | `""` | Mermaid v11 diagram source. Newlines must be real LF characters — `\n` literals are not decoded by the HTML parser. |
| `transparent` | boolean | `true` | Transparent background. Set `false` to render on a solid card. |

## Example

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
