import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, it } from 'vitest'
import { build } from 'vite'

it('emits installed runtime licences and notices on every build', async () => {
  const root = fileURLToPath(new URL('..', import.meta.url))
  const require = createRequire(resolve(root, 'package.json'))
  const echartsRoot = dirname(require.resolve('echarts/package.json'))
  const engineRequire = createRequire(resolve(echartsRoot, 'package.json'))
  const expected = [
    ['echarts/LICENSE', resolve(echartsRoot, 'LICENSE')],
    ['echarts/NOTICE', resolve(echartsRoot, 'NOTICE')],
    ['echarts/licenses/LICENSE-d3', resolve(echartsRoot, 'licenses/LICENSE-d3')],
    ['zrender/LICENSE', resolve(dirname(engineRequire.resolve('zrender/package.json')), 'LICENSE')],
    ['tslib/LICENSE.txt', resolve(dirname(engineRequire.resolve('tslib')), 'LICENSE.txt')],
    ['tslib/CopyrightNotice.txt', resolve(dirname(engineRequire.resolve('tslib')), 'CopyrightNotice.txt')],
  ]
  const built = await build({ root, configFile: resolve(root, 'vite.config.ts'), logLevel: 'silent', build: { write: false } })
  const result = Array.isArray(built) ? built[0] : built
  if (!result || !('output' in result)) throw new Error('Expected one library build')
  for (const [name, source] of expected) {
    const asset = result.output.find(item => item.fileName === `licenses/${name}`)
    expect(asset, name).toBeDefined()
    if (asset?.type !== 'asset') throw new Error(`Expected licence asset ${name}`)
    expect(Buffer.from(asset.source)).toEqual(readFileSync(source))
  }
}, 30000)
