import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => vi.doUnmock('./app/echarts'))

it('defers the dynamic import, shares one promise, and caches the runtime across consumers', async () => {
  vi.resetModules()
  const imported = vi.fn(() => ({ init: vi.fn(), connect: vi.fn() }))
  vi.doMock('./app/echarts', imported)
  const { loadECharts } = await import('./loader')
  expect(imported).not.toHaveBeenCalled()
  const first = loadECharts()
  const second = loadECharts()
  expect(second).toBe(first)
  expect(await second).toBe(await first)
  expect(imported).toHaveBeenCalledOnce()
  expect(loadECharts()).toBe(first)
})
