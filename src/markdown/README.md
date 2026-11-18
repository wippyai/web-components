# wippy-swiss/markdown — `<wippy-markdown>`

Renders [GitHub-Flavored Markdown](https://github.github.com/gfm/) to safe HTML using [markdown-it](https://github.com/markdown-it/markdown-it) and [sanitize-html](https://github.com/apostrophecms/sanitize-html). The default allowlist is conservative and safe for arbitrary input.

**Supported:** headings, bold/italic, links, images, ordered/unordered lists (nested), tables with alignment, fenced code blocks with language hints, inline code, blockquotes, strikethrough, autolinks, horizontal rules.

**Not supported by default:** GFM task lists (`- [x]`), footnotes (require extra markdown-it plugins not bundled here).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | string | `""` | Markdown source text (GFM). |
| `allowed-tags` | string[] | `[]` | Override the sanitizer tag allowlist. Empty uses the built-in tags plus AppConfig.allowAdditionalTags. **Security: only widen for trusted input.** |
| `allowed-attributes` | string | `""` | JSON-stringified `{tag: [attr, ...]}` map for sanitize-html. Empty uses the built-in attributes plus AppConfig.allowAdditionalTags. |

## AppConfig allowlist

The component uses `@wippy-fe/*` version `0.0.62` and reads the effective
`config.allowAdditionalTags` from `@wippy-fe/proxy`. Set the allowlist at the
top level of AppConfig, or in a page's `wippy.configOverrides`. Child config
does not contain `hostConfig`.

```json
{
  "allowAdditionalTags": {
    "svg": ["viewBox", "width", "height"],
    "rect": ["x", "y", "width", "height", "fill"]
  }
}
```

Raw HTML in Markdown is parsed and then sanitized. SVG tags and attributes
must be allowed explicitly. Case-sensitive SVG names retain their case.
The existing `@config` event refreshes rendered content when configuration
changes or the runtime registers a web component.

With empty props, the effective allowlist extends the built-in tags and
attributes. A nonempty `allowed-tags` prop replaces the tag list. A valid
`allowed-attributes` JSON prop replaces the attribute map. Existing prop
overrides continue to take precedence.

## Example

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

## Dependency declaration

```yaml
- name: wc-markdown
  kind: ns.dependency
  component: wippy-swiss/markdown
  version: ">=v0.1.0"
  parameters:
    - name: server
      value: app:gateway
```
