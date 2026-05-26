import { pipeline } from '@huggingface/transformers'

let asr: any = null

self.onmessage = async (e: MessageEvent) => {
  const { type, id } = e.data

  if (type === 'load') {
    const { model, wasmPaths } = e.data
    try {
      const ort = await import('onnxruntime-web')
      ort.env.wasm.wasmPaths = wasmPaths
      ort.env.wasm.numThreads = 1
      ort.env.wasm.simd = true
      ort.env.wasm.proxy = false
      asr = await pipeline('automatic-speech-recognition', model, {
        dtype: 'q8',
        device: 'wasm',
        progress_callback: (p: any) => {
          if (p.progress) self.postMessage({ type: 'progress', progress: p.progress })
        },
      })
      self.postMessage({ type: 'loaded', id })
    }
    catch (err: any) {
      self.postMessage({ type: 'error', id, message: err.message })
    }
  }

  if (type === 'transcribe') {
    const { audio } = e.data
    try {
      const r = await asr(audio, { return_timestamps: false })
      self.postMessage({ type: 'result', id, text: r.text?.trim() || '' })
    }
    catch (err: any) {
      self.postMessage({ type: 'error', id, message: err.message })
    }
  }
}
