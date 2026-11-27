/**
 * Requires a running app with wc-echarts (server: app:gateway) and a
 * wippy.lock replacement pointing to this worktree's src/echarts.
 * Uses the same external app and page frame as web-components.spec.ts.
 */
import type { FrameLocator } from '@playwright/test'
import { expect, test } from '@playwright/test'
import { loginAsAdmin, openHostPage } from './helpers/login'

const OPTION = {
  animation: false,
  grid: { left: 60, right: 60, top: 30, bottom: 30 },
  tooltip: {},
  xAxis: { type: 'category', data: ['A', 'B'] },
  yAxis: { max: 2 },
  series: [{ type: 'bar', name: 'Sales', data: [1, 2] }],
}

test.describe('wippy-echarts', () => {
  let frame: FrameLocator

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    frame = await openHostPage(page, process.env.E2E_PAGE_PATH || '/demo')
    await frame.locator('body').evaluate(async () => {
      const name = '@wippy-fe/proxy'
      const { loadByTagName } = await import(name)
      await loadByTagName('wippy-echarts')
    })
    await expect.poll(() => frame.locator('body').evaluate(() =>
      typeof customElements.get('wippy-echarts') === 'function'), { timeout: 15_000 }).toBe(true)
    await frame.locator('body').evaluate((_, option) => {
      const wrapper = document.createElement('div')
      wrapper.id = 'e2e-theme'
      const el = document.createElement('wippy-echarts')
      el.id = 'e2e-echarts'
      el.style.cssText = 'display:block;width:600px;height:300px'
      el.setAttribute('options', JSON.stringify(option))
      el.setAttribute('label', 'Quarterly revenue')
      const clicks: unknown[] = []
      const events: unknown[] = []
      document.addEventListener('chart-click', (e) => {
        const event = e as CustomEvent
        clicks.push({ detail: event.detail, bubbles: event.bubbles, composed: event.composed })
      })
      Object.assign(window, { e2eEChartsClicks: clicks })
      for (const name of ['chart-hover', 'chart-dblclick', 'legend-change', 'datazoom', 'chart-rendered', 'chart-error']) {
        document.addEventListener(name, (e) => {
          const event = e as CustomEvent
          events.push({ name, detail: event.detail, bubbles: event.bubbles, composed: event.composed })
        })
      }
      Object.assign(window, { e2eEChartsEvents: events })
      wrapper.appendChild(el)
      document.body.appendChild(wrapper)
    }, OPTION)
    await expect.poll(async () => (await frame.locator('#e2e-echarts canvas').boundingBox())?.height ?? 0)
      .toBe(300)
  })

  test.afterEach(async () => {
    await frame.locator('body').evaluate(async () => {
      const name = '@wippy-fe/proxy'
      const { host } = await import(name)
      host.setThemeMode('auto')
    })
  })

  test('fills the host and resizes with it', async () => {
    await frame.locator('#e2e-echarts').evaluate(el => el.style.height = '420px')
    await expect.poll(async () => (await frame.locator('#e2e-echarts canvas').boundingBox())?.height).toBe(420)
  })

  test('emits the exact chartjs detail only for a data element', async () => {
    const canvas = frame.locator('#e2e-echarts canvas')
    await canvas.click({ position: { x: 10, y: 10 } })
    await canvas.click({ position: { x: 420, y: 150 } })
    const clicks = () => frame.locator('body').evaluate(() =>
      (window as unknown as { e2eEChartsClicks: unknown[] }).e2eEChartsClicks)
    await expect.poll(clicks).toEqual([{
      detail: { label: 'B', datasetLabel: 'Sales', datasetIndex: 0, dataIndex: 1, value: 2 },
      bubbles: true,
      composed: true,
    }])
  })

  test('keeps tooltips inside the shadow root and supplies aria text', async () => {
    const chart = frame.locator('#e2e-echarts')
    await chart.evaluate(el => el.setAttribute('renderer', 'svg'))
    await expect(chart.getByRole('figure', { name: 'Quarterly revenue' })).toBeVisible()
    const svg = chart.locator('svg')
    await expect(svg).toBeVisible()
    await expect(svg).not.toContainText('Sales')
    await svg.hover({ position: { x: 420, y: 150 } })
    await expect(svg).toContainText('Sales')
    await expect.poll(() => frame.locator('#e2e-echarts .echarts-canvas-wrapper').getAttribute('aria-label')).toBeTruthy()
    const escapedTooltip = await frame.locator('body').evaluate(body =>
      Array.from(body.children).some(el => el instanceof HTMLElement
        && el.style.position === 'absolute' && el.textContent?.includes('Sales')))
    expect(escapedTooltip).toBe(false)
  })

  test('draws and hides a richText tooltip on Canvas', async () => {
    const chart = frame.locator('#e2e-echarts')
    await chart.evaluate((el, option) => el.setAttribute('options', JSON.stringify({
      ...option, tooltip: { backgroundColor: '#a13579', borderWidth: 0, showDelay: 0, hideDelay: 0, transitionDuration: 0 },
      series: option.series.map(series => ({ ...series, emphasis: { disabled: true } })),
    })), OPTION)
    // Probe a tooltip-only background color; hover highlighting cannot satisfy it.
    const hasTooltip = () => chart.evaluate(el => Array.from(el.shadowRoot?.querySelectorAll('canvas') ?? []).some(canvas => {
      const pixels = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i] === 0xa1 && pixels[i + 1] === 0x35 && pixels[i + 2] === 0x79 && pixels[i + 3] === 255) return true
      }
      return false
    }))
    await expect.poll(hasTooltip).toBe(false)
    await chart.locator('canvas').hover({ position: { x: 420, y: 150 } })
    await expect.poll(hasTooltip).toBe(true)
    await chart.locator('canvas').hover({ position: { x: 10, y: 10 } })
    await expect.poll(hasTooltip).toBe(false)
  })

  test('shows invalid JSON and recovers on the next valid option', async () => {
    const el = frame.locator('#e2e-echarts')
    await el.evaluate(node => node.setAttribute('options', '{'))
    await expect(el.getByRole('alert')).toContainText('Invalid options JSON:')
    await expect.poll(() => frame.locator('body').evaluate(() =>
      (window as unknown as { e2eEChartsEvents: { name: string }[] }).e2eEChartsEvents.some(event => event.name === 'chart-error'))).toBe(true)
    await el.evaluate((node, option) => node.setAttribute('options', JSON.stringify(option)), OPTION)
    await expect(el.getByRole('alert')).toHaveCount(0)
    await expect(el.locator('canvas')).toBeVisible()
  })

  test('replaces the option and removes the old series', async () => {
    await frame.locator('#e2e-echarts').evaluate((el) => el.setAttribute('options', JSON.stringify({
      animation: false,
      series: [{ type: 'pie', name: 'Share', radius: '70%', data: [{ name: 'Only', value: 9 }] }],
    })))
    const canvas = frame.locator('#e2e-echarts canvas')
    await canvas.click({ position: { x: 300, y: 150 } })
    await expect.poll(() => frame.locator('body').evaluate(() =>
      (window as unknown as { e2eEChartsClicks: unknown[] }).e2eEChartsClicks)).toEqual([{
      detail: { label: 'Only', datasetLabel: 'Share', datasetIndex: 0, dataIndex: 0, value: { name: 'Only', value: 9 } },
      bubbles: true,
      composed: true,
    }])
  })

  test('reapplies the chart after palette prop and official host theme changes', async () => {
    const chart = frame.locator('#e2e-echarts')
    await chart.evaluate(el => el.setAttribute('palette', '["#654321"]'))
    const hasColor = (color: number[]) => chart.locator('canvas').evaluate((element, color) => {
      const canvas = element as HTMLCanvasElement
      const pixels = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i] === color[0] && pixels[i + 1] === color[1] && pixels[i + 2] === color[2] && pixels[i + 3] === 255)
          return true
      }
      return false
    }, color)
    await expect.poll(() => hasColor([0x65, 0x43, 0x21])).toBe(true)
    await chart.evaluate(el => el.setAttribute('palette', '["#123456"]'))
    await expect.poll(() => hasColor([0x12, 0x34, 0x56])).toBe(true)

    const setTheme = (mode: 'light' | 'dark') => frame.locator('body').evaluate(async (_, mode) => {
      const name = '@wippy-fe/proxy'
      const { host } = await import(name)
      host.setThemeMode(mode)
    }, mode)
    await setTheme('light')
    await chart.evaluate((el, option) => {
      el.setAttribute('renderer', 'svg')
      el.setAttribute('options', JSON.stringify({ ...option, title: { text: 'Theme probe' } }))
    }, OPTION)
    const title = chart.locator('svg').getByText('Theme probe', { exact: true })
    await expect(title).toBeVisible()
    // Resolve the host token through CSS, since the token can use any CSS colour syntax.
    const paintedColor = () => title.evaluate(node => getComputedStyle(node).fill)
    const matchesHostText = () => title.evaluate(node => {
      const root = node.getRootNode() as ShadowRoot
      const probe = document.createElement('span')
      probe.style.color = getComputedStyle(root.host).getPropertyValue('--p-text-color').trim()
      root.appendChild(probe)
      const matches = getComputedStyle(node).fill === getComputedStyle(probe).color
      probe.remove()
      return matches
    })
    await expect.poll(matchesHostText).toBe(true)
    const light = await paintedColor()
    await setTheme('dark')
    await expect.poll(paintedColor).not.toBe(light)
    await expect.poll(matchesHostText).toBe(true)
    await expect.poll(() => frame.locator('body').evaluate(async () => {
      const name = '@wippy-fe/proxy'
      const { host } = await import(name)
      return host.getThemeMode()
    })).toBe('dark')
  })

  test('supports SVG, themed loading state and an explicit palette', async () => {
    await frame.locator('#e2e-echarts').evaluate((el) => {
      el.setAttribute('renderer', 'svg')
      el.setAttribute('palette', '["#123456","#654321"]')
      el.setAttribute('loading', 'true')
      el.setAttribute('loading-text', 'Please wait')
    })
    const chart = frame.locator('#e2e-echarts')
    await expect(chart.locator('svg')).toHaveCount(1)
    await expect(chart.getByRole('figure')).toHaveAttribute('aria-busy', 'true')
    const loading = chart.locator('wippy-loading[no-bg]')
    await expect(loading).toBeVisible()
    await expect(loading).toHaveAttribute('title', 'Please wait')
    const box = await chart.locator('.echarts-canvas-wrapper').boundingBox()
    expect(box).not.toBeNull()
    await expect.poll(() => loading.boundingBox()).toEqual(box)
    await chart.evaluate(el => el.setAttribute('loading', 'false'))
    await expect(loading).toHaveCount(0)
    await expect(chart.getByRole('figure')).toHaveAttribute('aria-busy', 'false')
  })

  test('uses explicit host semantic tokens across the shadow boundary', async () => {
    await frame.locator('#e2e-echarts').evaluate((el, option) => {
      el.setAttribute('renderer', 'svg')
      el.setAttribute('options', JSON.stringify({ ...option, title: { text: 'Token probe' } }))
      el.style.setProperty('--p-text-color', '#123456')
      el.style.setProperty('--p-text-muted-color', '#234567')
      el.setAttribute('theme-mode', 'light')
    }, OPTION)
    const svg = frame.locator('#e2e-echarts svg')
    await expect(svg.getByText('Token probe', { exact: true })).toHaveAttribute('fill', '#123456')
    await expect(svg.getByText('A', { exact: true })).toHaveAttribute('fill', '#234567')
  })

  test('emits hover, double click and finished events across the shadow boundary', async () => {
    const canvas = frame.locator('#e2e-echarts canvas')
    await canvas.hover({ position: { x: 420, y: 150 } })
    await canvas.dblclick({ position: { x: 420, y: 150 } })
    await expect.poll(() => frame.locator('body').evaluate(() => {
      const events = (window as unknown as { e2eEChartsEvents: { name: string, detail: unknown, bubbles: boolean, composed: boolean }[] }).e2eEChartsEvents
      return ['chart-hover', 'chart-dblclick', 'chart-rendered'].every(name => events.some(event => event.name === name && event.bubbles && event.composed))
    })).toBe(true)
  })

  test('emits legend selection and data zoom details', async ({ page }) => {
    await frame.locator('#e2e-echarts').evaluate((el, option) => {
      el.setAttribute('renderer', 'svg')
      el.setAttribute('options', JSON.stringify({ ...option, legend: { top: 0 }, dataZoom: [{ type: 'inside', throttle: 0 }] }))
    }, OPTION)
    const chart = frame.locator('#e2e-echarts')
    await chart.locator('svg').getByText('Sales', { exact: true }).click()
    await expect.poll(() => frame.locator('body').evaluate(() => {
      const events = (window as unknown as { e2eEChartsEvents: { name: string, detail: { selected?: Record<string, boolean> } }[] }).e2eEChartsEvents
      return events.some(event => event.name === 'legend-change' && event.detail.selected?.Sales === false)
    })).toBe(true)
    await chart.locator('svg').hover({ position: { x: 300, y: 150 } })
    await page.mouse.wheel(0, -120)
    await expect.poll(() => frame.locator('body').evaluate(() => {
      const events = (window as unknown as { e2eEChartsEvents: { name: string, detail: { start?: number, end?: number } }[] }).e2eEChartsEvents
      return events.some(event => event.name === 'datazoom' && typeof event.detail.start === 'number' && typeof event.detail.end === 'number')
    })).toBe(true)
  })

  test('waits near the viewport when lazy-init is true', async () => {
    await frame.locator('body').evaluate((_, option) => {
      const el = document.createElement('wippy-echarts')
      el.id = 'e2e-lazy-chart'
      el.style.cssText = 'display:block;width:600px;height:300px;margin-top:3000px'
      el.setAttribute('lazy-init', 'true')
      el.setAttribute('options', JSON.stringify(option))
      document.body.appendChild(el)
    }, OPTION)
    const el = frame.locator('#e2e-lazy-chart')
    await expect(el.locator('.echarts-canvas-wrapper')).toHaveCount(1)
    await expect(el.locator('canvas')).toHaveCount(0)
    await el.scrollIntoViewIfNeeded()
    await expect(el.locator('canvas')).toHaveCount(1)
  })

  test('reconnects with a fresh chart after removal', async () => {
    const element = await frame.locator('#e2e-echarts').elementHandle()
    const canvas = await frame.locator('#e2e-echarts canvas').elementHandle()
    const container = await frame.locator('#e2e-echarts .echarts-canvas-wrapper').elementHandle()
    if (!element || !canvas || !container) throw new Error('Expected the original element, container and canvas')
    const instanceId = await container.getAttribute('_echarts_instance_')
    if (!instanceId) throw new Error('Expected the original ECharts instance ID')
    await element.evaluate(el => el.remove())
    // Keep the element detached until Vue unmount and ECharts disposal finish.
    // Reattaching in the same turn would permit a retained chart to pass.
    // ECharts 6.1 dispose() clears this marker on its original container.
    await expect.poll(() => container.getAttribute('_echarts_instance_')).toBe('')
    await element.evaluate(el => document.querySelector('#e2e-theme')!.appendChild(el))
    await expect(frame.locator('#e2e-echarts canvas')).toHaveCount(1)
    await expect(frame.locator('#e2e-echarts canvas')).toBeVisible()
    await expect(frame.locator('#e2e-echarts .echarts-canvas-wrapper')).not.toHaveAttribute('_echarts_instance_', instanceId)
    expect(await canvas.evaluate(oldCanvas => document.querySelector('#e2e-echarts')?.shadowRoot?.querySelector('canvas') !== oldCanvas)).toBe(true)
  })
})
