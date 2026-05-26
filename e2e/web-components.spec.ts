/**
 * End-to-end tests for the wippy-wc-extras web components:
 *   <wippy-mermaid>, <wippy-markdown>, <wippy-chartjs>
 *
 * Requires a running wippy stack (e.g. app-template-raw) with replacements
 * pointing to this repo's modules and the wc-* ns.dependency entries declared.
 * See e2e/playwright.config.ts for setup instructions.
 *
 * Wippy's facade renders the host shell as a srcdoc iframe (no src attribute).
 * We access it directly via page.frameLocator('iframe').first().
 *
 * voice (<wippy-voice-orb>) is excluded: its public/ bundle is gitignored
 * (~130 MB of ONNX/Whisper) and must be built locally before testing.
 */
import { expect, test } from '@playwright/test'
import { loginAsAdmin, navigateHostTo } from './helpers/login'

interface WCFixture {
  tag: string
  attrs: Record<string, string>
}

const COMPONENTS: WCFixture[] = [
  {
    tag: 'wippy-mermaid',
    attrs: { definition: 'flowchart LR\n  A --> B' },
  },
  {
    tag: 'wippy-markdown',
    attrs: { content: '# Hello\nThis is **bold**.' },
  },
  {
    tag: 'wippy-chartjs',
    attrs: {
      type: 'bar',
      data: '{"labels":["A","B"],"datasets":[{"data":[1,2]}]}',
    },
  },
]

test.describe('wippy-wc-extras web components', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    await navigateHostTo(page, 'Iframe Demo')
  })

  test('all three WC custom elements are registered in the host frame', async ({ page }) => {
    const hostFrame = page.frameLocator('iframe').first()

    for (const { tag } of COMPONENTS) {
      await expect
        .poll(
          () =>
            hostFrame
              .locator('body')
              .evaluate((_, t) => typeof customElements.get(t) === 'function', tag),
          { message: `${tag} should be registered`, timeout: 15_000 },
        )
        .toBe(true)
    }
  })

  test('each WC creates a shadow root when appended via evaluate()', async ({ page }) => {
    const hostFrame = page.frameLocator('iframe').first()

    for (const { tag } of COMPONENTS) {
      await expect
        .poll(
          () =>
            hostFrame
              .locator('body')
              .evaluate((_, t) => typeof customElements.get(t) === 'function', tag),
          { message: `${tag} registered`, timeout: 15_000 },
        )
        .toBe(true)
    }

    for (const { tag, attrs } of COMPONENTS) {
      const hasShadow = await hostFrame.locator('body').evaluate(
        (_, { tagName, attributes }) => {
          const el = document.createElement(tagName)
          for (const [k, v] of Object.entries(attributes))
            el.setAttribute(k, v)
          document.body.appendChild(el)
          return el.shadowRoot !== null
        },
        { tagName: tag, attributes: attrs },
      )
      expect(hasShadow, `${tag} should have a shadow root after appending to DOM`).toBe(true)
    }
  })
})
