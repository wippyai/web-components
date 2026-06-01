import { ref } from 'vue'
import TranscriberWorker from '../workers/transcriber.worker.ts?worker'

export function useTranscriber(model: string) {
  const loaded = ref(false)
  const progress = ref(0)

  let worker: Worker | null = null
  let msgId = 0
  const pending = new Map<number, { resolve: (v: string) => void, reject: (e: Error) => void }>()

  function getWorker(): Worker {
    if (worker) return worker
    worker = new TranscriberWorker()
    worker.onmessage = (e: MessageEvent) => {
      const { type, id, message, text, progress: p } = e.data
      if (type === 'progress') { progress.value = p; return }
      const cb = pending.get(id)
      if (!cb) return
      pending.delete(id)
      if (type === 'error') cb.reject(new Error(message))
      else if (type === 'loaded') cb.resolve('')
      else if (type === 'result') cb.resolve(text)
    }
    return worker
  }

  function send(msg: object): Promise<string> {
    const id = ++msgId
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject })
      getWorker().postMessage({ ...msg, id })
    })
  }

  async function load(wasmPaths: string): Promise<void> {
    progress.value = 0
    await send({ type: 'load', model, wasmPaths })
    loaded.value = true
  }

  async function transcribe(audio: Float32Array): Promise<string> {
    const copy = audio.buffer.slice(0)
    return send({ type: 'transcribe', audio: new Float32Array(copy) })
  }

  function dispose() {
    worker?.terminate()
    worker = null
    loaded.value = false
  }

  return { loaded, progress, load, transcribe, dispose }
}
