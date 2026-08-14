const MUTE_KEY = 'sfxMuted'

let audioCtx = null
let listeners = []

const getMuted = () => {
  try {
    return window.localStorage.getItem(MUTE_KEY) === 'true'
  } catch {
    return false
  }
}

let muted = getMuted()

const getCtx = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    audioCtx = new AudioContext()
  }
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

const tone = ({ freq, duration = 0.06, type = 'sine', gain = 0.05, glideTo }) => {
  if (muted) return
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const amp = ctx.createGain()

    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, ctx.currentTime + duration)

    amp.gain.setValueAtTime(gain, ctx.currentTime)
    amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

    osc.connect(amp)
    amp.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {
    // audio unsupported/blocked — fail silently
  }
}

export const sfx = {
  bounce: () => tone({ freq: 180, duration: 0.07, type: 'square', gain: 0.04 }),
  spawn: () => tone({ freq: 420, glideTo: 720, duration: 0.12, type: 'triangle', gain: 0.05 }),
  click: () => tone({ freq: 900, duration: 0.03, type: 'sine', gain: 0.035 }),
  key: () => tone({ freq: 1400, duration: 0.015, type: 'square', gain: 0.02 }),
}

export const isMuted = () => muted

export const setMuted = (next) => {
  muted = next
  try {
    window.localStorage.setItem(MUTE_KEY, String(next))
  } catch {
    // localStorage unavailable — mute preference just won't persist
  }
  listeners.forEach((fn) => fn(muted))
}

export const toggleMuted = () => setMuted(!muted)

export const onMuteChange = (fn) => {
  listeners.push(fn)
  return () => {
    listeners = listeners.filter((l) => l !== fn)
  }
}
