/**
 * End-to-end tests for the wippy-swiss web components:
 *   <wippy-mermaid>, <wippy-markdown>, <wippy-chartjs>
 *
 * Requires a running wippy stack (e.g. app-template-raw) with replacements
 * pointing to this repo's modules and the wc-* ns.dependency entries declared.
 * See e2e/playwright.config.ts for setup instructions.
 *
 * The Web Host renders each view.page in its own iframe, and the components
 * are registered there. The tests open the app-template "Iframe Demo" page
 * (E2E_PAGE_PATH, default /demo) and work in its frame.
 *
 * voice (<wippy-voice-orb>) is excluded: its public/ bundle is gitignored
 * (~130 MB of ONNX/Whisper) and must be built locally before testing.
 */
import type { FrameLocator } from '@playwright/test'
import { expect, test } from '@playwright/test'
import { loginAsAdmin, openHostPage } from './helpers/login'

const PAGE_PATH = process.env.E2E_PAGE_PATH || '/demo'

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

async function waitForRegistered(frame: FrameLocator, tag: string) {
  await expect
    .poll(
      () => frame.locator('body').evaluate((_, t) => typeof customElements.get(t) === 'function', tag),
      { message: `${tag} should be registered`, timeout: 15_000 },
    )
    .toBe(true)
}

test.describe('wippy-swiss web components', () => {
  let frame: FrameLocator

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    frame = await openHostPage(page, PAGE_PATH)
  })

  test('all three WC custom elements are registered in the page frame', async () => {
    for (const { tag } of COMPONENTS)
      await waitForRegistered(frame, tag)
  })

  test('each WC creates a shadow root when appended via evaluate()', async () => {
    for (const { tag } of COMPONENTS)
      await waitForRegistered(frame, tag)

    for (const { tag, attrs } of COMPONENTS) {
      const hasShadow = await frame.locator('body').evaluate(
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

test.describe('wippy-chartjs', () => {
  let frame: FrameLocator

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    frame = await openHostPage(page, PAGE_PATH)
    await waitForRegistered(frame, 'wippy-chartjs')
    // A bar chart with no animation, sized on the element itself. chart-click events are
    // collected on the document, so the test also proves they bubble out of the shadow root.
    await frame.locator('body').evaluate(() => {
      const el = document.createElement('wippy-chartjs')
      el.id = 'e2e-chart'
      el.style.width = '600px'
      el.style.height = '300px'
      el.setAttribute('type', 'bar')
      el.setAttribute('data', JSON.stringify({ labels: ['A', 'B'], datasets: [{ label: 'Sales', data: [1, 2] }] }))
      el.setAttribute('options', JSON.stringify({ animation: false }))
      const w = window as unknown as { e2eClicks: unknown[] }
      w.e2eClicks = []
      document.addEventListener('chart-click', e => w.e2eClicks.push((e as CustomEvent).detail))
      document.body.appendChild(el)
    })
  })

  test('a height set on the element sizes the chart', async () => {
    const canvas = frame.locator('#e2e-chart canvas')
    await expect.poll(async () => (await canvas.boundingBox())?.height ?? 0, { timeout: 10_000 }).toBeGreaterThan(250)
    const box = (await canvas.boundingBox())!
    expect(box.height).toBeLessThanOrEqual(300)
  })

  test('a click on a bar emits chart-click, and a click on empty space emits nothing', async () => {
    const canvas = frame.locator('#e2e-chart canvas')
    await expect.poll(async () => (await canvas.boundingBox())?.height ?? 0, { timeout: 10_000 }).toBeGreaterThan(250)
    const box = (await canvas.boundingBox())!
    const clicks = () => frame.locator('body').evaluate(() => (window as unknown as { e2eClicks: unknown[] }).e2eClicks)

    // Above bar A (value 1 of 2): no data element there.
    await canvas.click({ position: { x: box.width * 0.25, y: box.height * 0.15 } })
    // Inside bar B (value 2, the full plot height).
    await canvas.click({ position: { x: box.width * 0.75, y: box.height * 0.6 } })

    await expect.poll(clicks, { timeout: 5_000 }).toHaveLength(1)
    expect(await clicks()).toEqual([{ label: 'B', datasetLabel: 'Sales', datasetIndex: 0, dataIndex: 1, value: 2 }])
  })
})
