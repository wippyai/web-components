import { ref } from 'vue'

const MIC_KEY = 'voice-orb:preferred-mic'

export interface MicDevice {
  id: string
  label: string
}

export function useAudio() {
  const devices = ref<MicDevice[]>([])
  const selectedDeviceId = ref(localStorage.getItem(MIC_KEY) || '')

  let stream: MediaStream | null = null
  let ctx: AudioContext | null = null
  let analyser: AnalyserNode | null = null
  let freqBuf: Uint8Array | null = null

  async function listDevices() {
    const tmp = await navigator.mediaDevices.getUserMedia({ audio: true })
    const all = await navigator.mediaDevices.enumerateDevices()
    tmp.getTracks().forEach(t => t.stop())

    devices.value = all
      .filter(d => d.kind === 'audioinput')
      .map(d => ({ id: d.deviceId, label: d.label || `Mic ${d.deviceId.slice(0, 8)}` }))

    if (!selectedDeviceId.value || !devices.value.some(d => d.id === selectedDeviceId.value)) {
      if (devices.value.length > 0) selectedDeviceId.value = devices.value[0].id
    }
  }

  function selectDevice(deviceId: string) {
    selectedDeviceId.value = deviceId
    localStorage.setItem(MIC_KEY, deviceId)
  }

  async function start() {
    const constraints: MediaStreamConstraints = {
      audio: {
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        ...(selectedDeviceId.value ? { deviceId: { exact: selectedDeviceId.value } } : {}),
      },
    }
    stream = await navigator.mediaDevices.getUserMedia(constraints)
    ctx = new AudioContext()
    analyser = ctx.createAnalyser()
    analyser.fftSize = 1024
    analyser.smoothingTimeConstant = 0.75
    freqBuf = new Uint8Array(analyser.frequencyBinCount)
    ctx.createMediaStreamSource(stream).connect(analyser)
  }

  // Returns normalized amplitude 0-1 focused on speech frequencies (~200-3000 Hz)
  function getAmplitude(): number {
    if (!analyser || !freqBuf) return 0
    analyser.getByteFrequencyData(freqBuf as Uint8Array<ArrayBuffer>)
    // bin width = sampleRate / fftSize ≈ 43 Hz at 44100 Hz
    // bins 5-70 ≈ 215 Hz to 3010 Hz
    const lo = 5, hi = 70
    let sum = 0
    for (let i = lo; i < hi; i++) sum += freqBuf[i]
    return Math.min(1, (sum / ((hi - lo) * 255)) * 3.5)
  }

  function stop() {
    if (ctx) { ctx.close(); ctx = null }
    if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null }
    analyser = null; freqBuf = null
  }

  return { devices, selectedDeviceId, listDevices, selectDevice, start, getAmplitude, stop }
}
