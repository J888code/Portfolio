import { useEffect, useState } from 'react'

const BOOT_LINES = [
  'initializing jasmine-lab v1.0...',
  'compiling shaders...',
  'calibrating chromatic aberration...',
  'placing project nodes...',
  'ready.',
]

const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [exiting, setExiting] = useState(false)

  // Scene assets here are procedural (shaders, no textures/models loaded
  // via useLoader), so there's nothing real to report progress on — pace
  // the boot sequence with a timer instead so it reads as an intentional
  // sequence rather than an instant flash or a stuck bar.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(100, p + 4))
    }, 40)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const step = Math.min(BOOT_LINES.length - 1, Math.floor((progress / 100) * BOOT_LINES.length))
    setLineIdx(step)
  }, [progress])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => {
        setExiting(true)
        setTimeout(onDone, 500)
      }, 350)
      return () => clearTimeout(t)
    }
  }, [progress, onDone])

  return (
    <div className={`lab-loading ${exiting ? 'lab-loading--exit' : ''}`}>
      <div className="lab-loading__glyph">
        <span className="lab-loading__glyph-layer lab-loading__glyph-red">J</span>
        <span className="lab-loading__glyph-layer lab-loading__glyph-blue">J</span>
        <span className="lab-loading__glyph-layer lab-loading__glyph-base">J</span>
      </div>
      <p className="lab-loading__line">{BOOT_LINES[lineIdx]}</p>
      <div className="lab-loading__bar">
        <div className="lab-loading__bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="lab-loading__pct">{Math.floor(progress)}%</p>
    </div>
  )
}

export default LoadingScreen
