import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { sfx } from '../../../utils/sfx'
import './index.scss'

const SIZE = 170
const SPEED = 2.6
const SPIN_DEGREES_PER_SEC = 60
const MAX_INSTANCES = 20

const randomVelocity = () => {
  const angle = Math.random() * Math.PI * 2
  return { x: Math.cos(angle) * SPEED, y: Math.sin(angle) * SPEED }
}

let nextId = 1

const BouncingJ = ({ onSpawn }) => {
  const logoRef = useRef(null)
  const glyphRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = logoRef.current
    const container = el.parentElement
    let raf
    let bounds = container.getBoundingClientRect()
    let isHovered = false
    let angle = -8
    let lastTime = null

    const updateBounds = () => {
      bounds = container.getBoundingClientRect()
    }
    window.addEventListener('resize', updateBounds)

    const pos = {
      x: Math.random() * Math.max(bounds.width - SIZE, 0),
      y: Math.random() * Math.max(bounds.height - SIZE, 0),
    }
    const vel = randomVelocity()

    const spawnImpact = () => {
      el.classList.remove('is-impact')
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth
      el.classList.add('is-impact')
      sfx.bounce()
    }

    const tick = (timestamp) => {
      try {
        const dt = lastTime === null ? 0 : (timestamp - lastTime) / 1000
        lastTime = timestamp

        const maxX = Math.max(bounds.width - SIZE, 0)
        const maxY = Math.max(bounds.height - SIZE, 0)

        pos.x += vel.x
        pos.y += vel.y

        let bounced = false

        if (pos.x <= 0) {
          pos.x = 0
          vel.x = Math.abs(vel.x)
          bounced = true
        } else if (pos.x >= maxX) {
          pos.x = maxX
          vel.x = -Math.abs(vel.x)
          bounced = true
        }

        if (pos.y <= 0) {
          pos.y = 0
          vel.y = Math.abs(vel.y)
          bounced = true
        } else if (pos.y >= maxY) {
          pos.y = maxY
          vel.y = -Math.abs(vel.y)
          bounced = true
        }

        el.style.transform = `translate(${pos.x}px, ${pos.y}px)`

        if (bounced) spawnImpact()

        if (isHovered && glyphRef.current) {
          angle += SPIN_DEGREES_PER_SEC * dt
          glyphRef.current.style.transform = `rotate(${angle}deg)`
        }
      } finally {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)

    const handleEnter = () => {
      isHovered = true
      setHovered(true)
    }
    const handleLeave = () => {
      isHovered = false
      setHovered(false)
    }
    const handleClick = () => {
      sfx.spawn()
      onSpawn()
    }

    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
    el.addEventListener('click', handleClick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', updateBounds)
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
      el.removeEventListener('click', handleClick)
    }
  }, [onSpawn])

  return (
    <div ref={logoRef} className={`bouncing-logo ${hovered ? 'is-hovered' : ''}`}>
      <span className="impact-shell">
        <span ref={glyphRef} className="glyph" aria-hidden="true">
          <span className="glyph-layer glyph-red">J</span>
          <span className="glyph-layer glyph-blue">J</span>
          <span className="glyph-layer glyph-base">J</span>
        </span>
      </span>
    </div>
  )
}

const Logo = forwardRef((_, ref) => {
  const [ids, setIds] = useState([0])

  const spawn = useCallback(() => {
    setIds((prev) => (prev.length >= MAX_INSTANCES ? prev : [...prev, nextId++]))
  }, [])

  useImperativeHandle(ref, () => ({
    reset: () => setIds([nextId++]),
  }))

  return (
    <>
      {ids.map((id) => (
        <BouncingJ key={id} onSpawn={spawn} />
      ))}
    </>
  )
})

export default Logo
