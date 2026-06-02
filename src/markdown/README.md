# wippy-swiss/markdown — `<wippy-markdown>`

Renders [GitHub-Flavored Markdown](https://github.github.com/gfm/) to safe HTML using [markdown-it](https://github.com/markdown-it/markdown-it) and [sanitize-html](https://github.com/apostrophecms/sanitize-html). The default allowlist is conservative and safe for arbitrary input.

**Supported:** headings, bold/italic, links, images, ordered/unordered lists (nested), tables with alignment, fenced code blocks with language hints, inline code, blockquotes, strikethrough, autolinks, horizontal rules.

**Not supported by default:** GFM task lists (`- [x]`), footnotes (require extra markdown-it plugins not bundled here).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | string | `""` | Markdown source text (GFM). |
| `allowed-tags` | string[] | `[]` | Override the sanitizer tag allowlist. Empty = built-in defaults. **Security: only widen for trusted input.** |
| `allowed-attributes` | string | `""` | JSON-stringified `{tag: [attr, ...]}` map for sanitize-html. Empty = defaults. |

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
