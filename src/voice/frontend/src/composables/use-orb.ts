import { type Ref, onMounted, onUnmounted } from 'vue'

export type OrbMode = 'idle' | 'listening' | 'speaking' | 'processing'

const N = 128       // points on circle
const CX = 80, CY = 80
const BASE_R = 42   // just outside button edge (button=36px in 72px → 40 SVG units)

function buildPath(radii: Float32Array): string {
  const pts: string[] = []
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2
    const x = (CX + radii[i] * Math.cos(a)).toFixed(2)
    const y = (CY + radii[i] * Math.sin(a)).toFixed(2)
    pts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`)
  }
  return pts.join('') + 'Z'
}

function buildArc(startA: number, sweep: number, r: number): string {
  const x1 = (CX + r * Math.cos(startA)).toFixed(2)
  const y1 = (CY + r * Math.sin(startA)).toFixed(2)
  const x2 = (CX + r * Math.cos(startA + sweep)).toFixed(2)
  const y2 = (CY + r * Math.sin(startA + sweep)).toFixed(2)
  const large = sweep > Math.PI ? 1 : 0
  return `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2}`
}

function lerpRadii(current: Float32Array, target: Float32Array, speed: number) {
  for (let i = 0; i < N; i++) {
    current[i] += (target[i] - current[i]) * speed
  }
}

// Read theme colors from CSS custom properties on the shadow host
function resolveColors(el: SVGElement): Record<string, string> {
  // Walk up to find the shadow root host (or document root)
  let root: Element = el
  while (root.parentElement) root = root.parentElement
  const host = (root as ShadowRoot).host ?? root
  const s = getComputedStyle(host)

  const get = (prop: string, fallback: string) => s.getPropertyValue(prop).trim() || fallback

  return {
    idle: get('--vo-idle-stroke', '#d1d5db'),
    listening: get('--vo-listening-stroke', '#22c55e'),
    listeningFill: get('--vo-listening-fill', '#22c55e'),
    speaking: get('--vo-speaking-stroke', '#6366f1'),
    speakingFill: get('--vo-speaking-fill', '#6366f1'),
    processing: get('--vo-processing-stroke', '#a855f7'),
  }
}

function withAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export function useOrb(
  ringRef: Ref<SVGPathElement | null>,
  fillRef: Ref<SVGPathElement | null>,
  getAmplitude: () => number,
) {
  const radii = new Float32Array(N).fill(BASE_R)
  const target = new Float32Array(N).fill(BASE_R)

  let mode: OrbMode = 'idle'
  let t = 0
  let spinAngle = 0
  let collapseScale = 1
  let collapseCallback: (() => void) | null = null
  let collapsing = false
  let frame: number | null = null
  let colors: Record<string, string> | null = null

  function getColors(el: SVGElement) {
    if (!colors) colors = resolveColors(el)
    return colors
  }

  function setMode(m: OrbMode) {
    mode = m
    collapsing = false
    collapseCallback = null
    collapseScale = 1
  }

  function collapse(onDone: () => void) {
    collapsing = true
    collapseScale = 1
    collapseCallback = onDone
  }

  function set(ring: SVGPathElement, fill: SVGPathElement, d: string, stroke: string, sw: string, fillColor: string, opacity: string, glow: boolean) {
    ring.setAttribute('d', d)
    ring.setAttribute('stroke', stroke)
    ring.setAttribute('stroke-width', sw)
    ring.setAttribute('opacity', opacity)
    ring.setAttribute('filter', glow ? 'url(#orb-glow)' : '')
    fill.setAttribute('d', d)
    fill.setAttribute('fill', fillColor)
  }

  function drawIdle(ring: SVGPathElement, fill: SVGPathElement) {
    const c = getColors(ring)
    for (let i = 0; i < N; i++) target[i] = BASE_R
    lerpRadii(radii, target, 0.08)
    const d = buildPath(radii)
    set(ring, fill, d, c.idle, '1.5', 'transparent', '1', false)
  }

  function drawListening(ring: SVGPathElement, fill: SVGPathElement) {
    const c = getColors(ring)
    const amp = getAmplitude()
    const breathe = Math.sin(t * 1.2) * 0.8
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2
      const wobble = Math.sin(a * 2 + t * 0.9) * 0.3
                   + Math.sin(a * 3 - t * 0.6) * 0.2
                   + Math.sin(a * 1 + t * 1.2) * 0.15
      target[i] = BASE_R + breathe + wobble + amp * Math.sin(a * 4 + t * 3) * 1.5
    }
    lerpRadii(radii, target, 0.1)
    const d = buildPath(radii)
    set(ring, fill, d, c.listening, '1.5', withAlpha(c.listeningFill, 0.06), '0.85', true)
  }

  function drawSpeaking(ring: SVGPathElement, fill: SVGPathElement) {
    const c = getColors(ring)
    const amp = getAmplitude()
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2
      const wave = Math.sin(a * 6  - t * 7.0) * 0.5
                 + Math.sin(a * 9  - t * 11.0) * 0.3
                 + Math.sin(a * 12 + t * 8.0)  * 0.15
                 + Math.sin(a * 4  - t * 5.0)  * 0.35
                 + Math.sin(a * 15 + t * 13.0) * 0.1
      target[i] = BASE_R + wave * amp * 3
    }
    lerpRadii(radii, target, 0.15)
    const d = buildPath(radii)
    set(ring, fill, d, c.speaking, '2', withAlpha(c.speakingFill, 0.06), '0.95', true)
  }

  function drawProcessing(ring: SVGPathElement, fill: SVGPathElement) {
    const c = getColors(ring)
    for (let i = 0; i < N; i++) target[i] = BASE_R
    lerpRadii(radii, target, 0.12)

    spinAngle += 0.04
    const pulse = 0.55 + Math.sin(t * 7) * 0.45
    const d = buildArc(spinAngle, Math.PI * 0.65, BASE_R)
            + ' ' + buildArc(spinAngle + Math.PI, Math.PI * 0.35, BASE_R)

    ring.setAttribute('d', d)
    ring.setAttribute('stroke', c.processing)
    ring.setAttribute('stroke-width', '2.5')
    ring.setAttribute('opacity', String(0.5 + pulse * 0.5))
    ring.setAttribute('filter', 'url(#orb-glow)')
    fill.setAttribute('d', '')
    fill.setAttribute('fill', 'transparent')
  }

  function drawCollapsing(ring: SVGPathElement, fill: SVGPathElement) {
    const c = getColors(ring)
    collapseScale *= 0.85
    if (collapseScale < 0.02) {
      ring.setAttribute('d', '')
      fill.setAttribute('d', '')
      const cb = collapseCallback
      collapsing = false
      collapseCallback = null
      for (let i = 0; i < N; i++) radii[i] = BASE_R
      cb?.()
      return
    }
    const scaled = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      scaled[i] = BASE_R + (radii[i] - BASE_R) * collapseScale
    }
    const d = buildPath(scaled)
    set(ring, fill, d, c.speaking, '2', withAlpha(c.speakingFill, 0.06), String(collapseScale), true)
  }

  function loop() {
    t += 0.016
    const ring = ringRef.value
    const fill = fillRef.value
    if (!ring || !fill) { frame = requestAnimationFrame(loop); return }

    if (collapsing) {
      drawCollapsing(ring, fill)
    }
    else {
      switch (mode) {
        case 'idle':       drawIdle(ring, fill);       break
        case 'listening':  drawListening(ring, fill);  break
        case 'speaking':   drawSpeaking(ring, fill);   break
        case 'processing': drawProcessing(ring, fill); break
      }
    }
    frame = requestAnimationFrame(loop)
  }

  onMounted(() => { frame = requestAnimationFrame(loop) })
  onUnmounted(() => { if (frame) { cancelAnimationFrame(frame); frame = null } })

  return { setMode, collapse }
}
