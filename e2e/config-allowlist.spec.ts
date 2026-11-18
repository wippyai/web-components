import type { Frame, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'
import { loginAsAdmin } from './helpers/login'

test.skip(process.env.SWISSKNIFE_SMOKE !== '1', 'Requires all four Swissknife modules in the Web Host')

type Tags = Record<string, string[]>
interface SmokeWindow extends Window {
  __WIPPY_APP_CONFIG__?: { selfPageId?: string, allowAdditionalTags?: Tags }
  __WIPPY_APP_API__?: unknown
  getWippyApi: () => Promise<{ loadByTagName: (tag: string) => Promise<void> }>
  __swissUnsafe?: number
}

const svgTags = {
  svg: ['viewBox', 'preserveAspectRatio', 'width', 'height'],
  defs: [],
  linearGradient: ['id'],
  stop: ['offset', 'stop-color'],
  rect: ['width', 'height', 'fill'],
}
const svgSource = '<svg viewBox="0 0 100 40" preserveAspectRatio="xMidYMid meet" width="300" height="120" onload="window.__swissUnsafe=1"><defs><linearGradient id="swissGradient"><stop offset="0" stop-color="blue"></stop></linearGradient></defs><rect width="100" height="40" fill="url(#swissGradient)" onclick="window.__swissUnsafe=2"></rect><script>window.__swissUnsafe=3</script><a href="javascript:window.__swissUnsafe=4">Unsafe</a></svg>'

async function childFrame(page: Page): Promise<Frame> {
  let child: Frame | undefined
  await expect.poll(async () => {
    for (const frame of page.frames()) {
      const ownsPage = await frame.evaluate(() => {
        const win = window as SmokeWindow
        return win.__WIPPY_APP_CONFIG__?.selfPageId === 'app.views:main' && Boolean(win.__WIPPY_APP_API__)
      }).catch(() => false)
      const visible = frame.name().startsWith('wf:')
        ? await page.locator(`web-fragment[fragment-id="${frame.name().slice(3)}"]`).isVisible()
        : frame !== page.mainFrame() && await frame.frameElement().then(el => el.isVisible()).catch(() => false)
      if (ownsPage && visible) {
        child = frame
        return true
      }
    }
    return false
  }, { timeout: 30_000 }).toBe(true)
  if (!child) throw new Error('The consumer main page is missing')
  return child
}

function renderedRoot(page: Page, child: Frame) {
  return child.name().startsWith('wf:')
    ? page.locator(`web-fragment[fragment-id="${child.name().slice(3)}"]`)
    : child
}

async function configure(child: Frame, tags: Tags) {
  await child.evaluate(({ tags, fragmentId }) => {
    window.postMessage(JSON.stringify({
      $schema: '/schemas/wippy-context-2.1.json', type: '@gen2-chat', action: 'set-config', fragmentId,
      allowAdditionalTags: tags,
    }), '*')
  }, { tags, fragmentId: child.name().startsWith('wf:') ? child.name().slice(3) : undefined })
  await expect.poll(() => child.evaluate(() => Boolean((window as SmokeWindow).__WIPPY_APP_CONFIG__?.allowAdditionalTags?.svg))).toBe(Boolean(tags.svg))
}

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page)
})

test('all four installed Swissknife components render in the Web Host', async ({ page }) => {
  const failures: string[] = []
  page.on('pageerror', error => failures.push(error.message))
  const child = await childFrame(page)
  await child.evaluate(async () => {
    const api = await (window as SmokeWindow).getWippyApi()
    const fixtures = [
      { tag: 'wippy-markdown', attrs: { content: '# Swissknife Markdown\n\n**Rendered** content.' } },
      { tag: 'wippy-mermaid', attrs: { definition: 'flowchart LR\n  Before --> After' } },
      { tag: 'wippy-chartjs', attrs: { type: 'bar', data: '{"labels":["A","B"],"datasets":[{"data":[1,2]}]}' } },
      { tag: 'wippy-voice-orb', attrs: {} },
    ]
    const fixture = document.createElement('section')
    fixture.id = 'swissknife-fixture'
    for (const { tag, attrs } of fixtures) {
      await api.loadByTagName(tag)
      const el = document.createElement(tag)
      for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
      fixture.appendChild(el)
    }
    document.body.prepend(fixture)
  })
  const fixture = renderedRoot(page, child).locator('#swissknife-fixture')
  await expect(fixture.locator('wippy-markdown strong')).toHaveText('Rendered')
  await expect(fixture.locator('wippy-mermaid svg')).toBeVisible()
  await expect(fixture.locator('wippy-mermaid svg')).toContainText('Before')
  await child.evaluate(() => {
    document.querySelector('#swissknife-fixture wippy-mermaid')?.setAttribute('definition', 'pie title Pie chart\n  "A" : 60\n  "B" : 40')
  })
  await expect(fixture.locator('wippy-mermaid svg')).toContainText('Pie chart')
  await expect(fixture.locator('wippy-chartjs canvas')).toBeVisible()
  await expect(fixture.locator('wippy-voice-orb button').first()).toBeVisible()
  await expect(fixture.locator('[role="alert"]')).toHaveCount(0)
  expect(failures).toEqual([])
})

test('Markdown reacts to top-level config, preserves SVG case and sanitizes unsafe HTML', async ({ page }) => {
  const child = await childFrame(page)
  await configure(child, svgTags)
  await child.evaluate(async content => {
    const api = await (window as SmokeWindow).getWippyApi()
    await api.loadByTagName('wippy-markdown')
    const markdown = document.createElement('wippy-markdown')
    markdown.id = 'swiss-markdown'
    markdown.setAttribute('content', `# SVG configuration\n\n${content}`)
    document.body.prepend(markdown)
  }, svgSource)
  const markdown = renderedRoot(page, child).locator('#swiss-markdown')
  const svg = markdown.locator('svg')
  await expect(svg).toBeVisible()
  await expect(svg).toHaveAttribute('viewBox', '0 0 100 40')
  await expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet')
  await expect(svg.locator('linearGradient')).toHaveAttribute('id', 'swissGradient')
  await expect(markdown.locator('script, [onload], [onclick], [href^="javascript:"]')).toHaveCount(0)
  expect(await child.evaluate(() => (window as SmokeWindow).__swissUnsafe)).toBeUndefined()
  await configure(child, {})
  await expect(svg).toHaveCount(0)
  await configure(child, svgTags)
  await expect(svg).toBeVisible()
})

test('existing Markdown props override inherited tags and attributes', async ({ page }) => {
  const child = await childFrame(page)
  await configure(child, svgTags)
  await child.evaluate(async content => {
    const api = await (window as SmokeWindow).getWippyApi()
    await api.loadByTagName('wippy-markdown')
    const markdown = document.createElement('wippy-markdown')
    markdown.id = 'swiss-explicit-policy'
    markdown.setAttribute('content', `<p title="denied">Explicit policy</p>${content}`)
    markdown.setAttribute('allowed-tags', '["p"]')
    markdown.setAttribute('allowed-attributes', '{"p":[]}')
    document.body.prepend(markdown)
  }, svgSource)
  const markdown = renderedRoot(page, child).locator('#swiss-explicit-policy')
  await expect(markdown.locator('p')).toHaveText('Explicit policy')
  await expect(markdown.locator('p')).not.toHaveAttribute('title')
  await expect(markdown.locator('svg')).toHaveCount(0)
})

test('Markdown refreshes when the runtime registers a late web component', async ({ page }) => {
  const child = await childFrame(page)
  const tag = 'swiss-late-widget'
  await child.evaluate(async tag => {
    const api = await (window as SmokeWindow).getWippyApi()
    await api.loadByTagName('wippy-markdown')
    const markdown = document.createElement('wippy-markdown')
    markdown.id = 'swiss-late-registration'
    markdown.setAttribute('content', `<${tag} data-allowed="yes" data-denied="no">Late component</${tag}>`)
    document.body.prepend(markdown)
  }, tag)
  const markdown = renderedRoot(page, child).locator('#swiss-late-registration')
  await expect(markdown.locator('article')).toContainText('Late component')
  await expect(markdown.locator(tag)).toHaveCount(0)
  await child.evaluate(async tag => {
    customElements.define(tag, class extends HTMLElement {
      static observedAttributes = ['data-allowed']
    })
    const api = await (window as SmokeWindow).getWippyApi()
    await api.loadByTagName(tag)
  }, tag)
  await expect(markdown.locator(tag)).toHaveCount(1)
  await expect(markdown.locator(tag)).toHaveAttribute('data-allowed', 'yes')
  await expect(markdown.locator(tag)).not.toHaveAttribute('data-denied')
})
