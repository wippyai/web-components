import { resolve } from 'node:path'
import { copyFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import { wippyComponentPlugin } from '@wippy-fe/vite-plugin'
import { defineConfig } from 'vite'

const COPY_TO_PUBLIC: { src: string; name: string }[] = [
  { src: 'node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js', name: 'vad.worklet.bundle.min.js' },
  { src: 'node_modules/@ricky0123/vad-web/dist/silero_vad_v5.onnx', name: 'silero_vad_v5.onnx' },
  { src: 'node_modules/@ricky0123/vad-web/dist/silero_vad_legacy.onnx', name: 'silero_vad_legacy.onnx' },
]

export default defineConfig({
  base: '/@static-wippy-swiss/voice/',
  plugins: [
    vue(),
    wippyComponentPlugin(),
    {
      name: 'copy-voice-assets',
      closeBundle() {
        for (const { src, name } of COPY_TO_PUBLIC)
          copyFileSync(resolve(__dirname, src), resolve(__dirname, '../public', name))
      },
    },
  ],
  worker: {
    format: 'es',
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VoiceOrb',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      external: [
        'vue',
        'pinia',
        '@iconify/vue',
        '@wippy-fe/proxy',
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
      preserveEntrySignatures: false,
    },
    outDir: '../public',
    sourcemap: false,
  },
})
