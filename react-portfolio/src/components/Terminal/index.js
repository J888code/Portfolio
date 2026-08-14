import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sfx } from '../../utils/sfx'
import { getViewCountOnce } from '../../utils/stats'
import './index.scss'

const BOOT_LINES = [
  'booting jasmine-os v2.0...',
  'loading modules: react, javascript, css, node...',
  'connection established.',
  '',
  "type 'help' to see available commands.",
]

const HELP_TEXT = [
  'available commands:',
  '  about       - open the about page',
  '  portfolio   - open the portfolio page',
  '  contact     - open the contact page',
  '  email       - contact email',
  '  socials     - social links',
  '  resume      - open the resume',
  '  source      - view the source code',
  '  neofetch    - system info',
  '  views       - total site views',
  '  theme       - theme <red|green|amber>',
  '  whoami      - print current user',
  '  clear       - clear the terminal',
  '  exit        - go back to the home page',
]

const COMMANDS = [
  'help',
  'about',
  'portfolio',
  'projects',
  'contact',
  'email',
  'socials',
  'resume',
  'cv',
  'source',
  'neofetch',
  'views',
  'theme',
  'whoami',
  'clear',
  'exit',
  'home',
  'coffee',
  'matrix',
  'error',
]

const THEMES = ['red', 'green', 'amber']

const COFFEE_ART = [
  '      ( (',
  '       ) )',
  '    ........',
  '    |      |]',
  '    \\      /',
  "     `----'",
]

const NEOFETCH_ASCII = ['   __', '  |  |', '  |  |', '  |  |', '\\   |', ' \\__|', '     ']

const MATRIX_CHARS =
  'アイウエオカキクケコサシスセソ0123456789ABCDEFJASMINE'

const HISTORY_KEY = 'terminalHistory'

const loadHistory = () => {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const levenshtein = (a, b) => {
  const rows = a.length + 1
  const cols = b.length + 1
  const grid = Array.from({ length: rows }, (_, i) => [
    i,
    ...Array(cols - 1).fill(0),
  ])
  for (let j = 1; j < cols; j += 1) grid[0][j] = j

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      grid[i][j] = Math.min(
        grid[i - 1][j] + 1,
        grid[i][j - 1] + 1,
        grid[i - 1][j - 1] + cost
      )
    }
  }

  return grid[rows - 1][cols - 1]
}

const closestCommand = (word) => {
  let best = null
  let bestDist = Infinity
  COMMANDS.forEach((c) => {
    const dist = levenshtein(word, c)
    if (dist < bestDist) {
      bestDist = dist
      best = c
    }
  })
  return bestDist <= 2 ? best : null
}

const Terminal = () => {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const matrixCanvasRef = useRef(null)
  const terminalBodyRef = useRef(null)
  const [lines, setLines] = useState([])
  const [booted, setBooted] = useState(false)
  const [value, setValue] = useState('')
  const [cursorPos, setCursorPos] = useState(0)
  const [theme, setTheme] = useState('green')
  const [matrixActive, setMatrixActive] = useState(false)
  const [errorFillLine, setErrorFillLine] = useState('')
  const historyRef = useRef(loadHistory())
  const historyIndexRef = useRef(historyRef.current.length)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setLines((prev) => [...prev, { type: 'output', text: BOOT_LINES[i] }])
      i += 1
      if (i >= BOOT_LINES.length) {
        clearInterval(timer)
        setBooted(true)
      }
    }, 260)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines, errorFillLine])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') navigate('/')
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [navigate])

  useEffect(() => {
    if (!matrixActive) return undefined

    const canvas = matrixCanvasRef.current
    const windowEl = canvas.parentElement
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = windowEl.clientWidth
      canvas.height = windowEl.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const fontSize = 16
    const columns = Math.max(1, Math.floor(canvas.width / fontSize))
    const drops = Array(columns).fill(1)

    let raf
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#33ff66'
      ctx.font = `${fontSize}px monospace`

      drops.forEach((y, i) => {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        ctx.fillText(char, i * fontSize, y * fontSize)
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 1
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [matrixActive])

  const focusInput = () => inputRef.current?.focus()

  const syncCursor = (e) => setCursorPos(e.target.selectionStart)

  const setInputValue = (next) => {
    setValue(next)
    setCursorPos(next.length)
    const el = inputRef.current
    if (el) {
      // Keep the real input's DOM value/caret in sync immediately, since
      // React's state update won't reach the DOM until the next render.
      el.value = next
      el.setSelectionRange(next.length, next.length)
    }
  }

  const pushToHistory = (raw) => {
    if (!raw.trim()) return
    historyRef.current = [...historyRef.current, raw]
    historyIndexRef.current = historyRef.current.length
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(historyRef.current))
    } catch {
      // localStorage unavailable — history just won't persist across reloads
    }
  }

  const runCommand = (raw) => {
    const trimmed = raw.trim().toLowerCase()
    const [cmd, ...args] = trimmed.split(/\s+/)
    const echo = { type: 'input', text: raw }

    if (trimmed === '') {
      setLines((prev) => [...prev, echo])
      return
    }

    if (cmd === 'clear') {
      setLines([])
      return
    }

    let output = []

    switch (cmd) {
      case 'help':
        output = HELP_TEXT
        break
      case 'about':
        output = ['opening about page...']
        break
      case 'whoami':
        output = ['guest@jasmine-portfolio']
        break
      case 'portfolio':
      case 'projects':
        output = ['opening portfolio...']
        break
      case 'contact':
        output = ['opening contact page...']
        break
      case 'email':
        output = ['no email set up yet — check the contact page for updates.']
        break
      case 'socials':
        output = [
          'github    - not linked yet',
          'linkedin  - not linked yet',
          'youtube   - not linked yet',
        ]
        break
      case 'resume':
      case 'cv':
        output = ["resume page isn't built yet — check back soon."]
        break
      case 'theme':
        if (THEMES.includes(args[0])) {
          setTheme(args[0])
          output = [`theme set to ${args[0]}.`]
        } else {
          output = [`usage: theme <${THEMES.join('|')}>`]
        }
        break
      case 'source':
        output = ["source not linked yet — this'll point at the repo once it's ready."]
        break
      case 'neofetch': {
        const info = [
          'guest@jasmine-portfolio',
          '-----------------------',
          'OS: JasmineOS',
          'Shell: react-terminal',
          `Theme: ${theme}`,
          'Uptime: since 2026',
          'Languages: JS, HTML, CSS',
        ]
        const rows = Math.max(NEOFETCH_ASCII.length, info.length)
        output = Array.from({ length: rows }, (_, i) => {
          const art = (NEOFETCH_ASCII[i] || '').padEnd(9)
          return `${art} ${info[i] || ''}`
        })
        break
      }
      case 'views':
        output = ['checking the counter...']
        break
      case 'coffee':
        output = [...COFFEE_ART, 'brewing your coffee...']
        break
      case 'matrix':
        output = ['entering the matrix...']
        break
      case 'error':
        output = ['initiating error sequence...']
        break
      case 'exit':
      case 'home':
        output = ['returning home...']
        break
      default: {
        const suggestion = closestCommand(cmd)
        output = suggestion
          ? [`command not found: ${cmd} — did you mean '${suggestion}'?`]
          : [`command not found: ${cmd}`, "type 'help' for a list of commands."]
      }
    }

    setLines((prev) => [...prev, echo, ...output.map((text) => ({ type: 'output', text }))])
    pushToHistory(raw)

    if (cmd === 'about') setTimeout(() => navigate('/about'), 700)
    if (cmd === 'portfolio' || cmd === 'projects') setTimeout(() => navigate('/portfolio'), 700)
    if (cmd === 'contact') setTimeout(() => navigate('/contact'), 700)
    if (cmd === 'exit' || cmd === 'home') setTimeout(() => navigate('/'), 700)

    if (cmd === 'views') {
      getViewCountOnce().then((count) => {
        const text = count === null ? "couldn't reach the counter." : `${count.toLocaleString()} total views.`
        setLines((prev) => [...prev, { type: 'output', text }])
      })
    }

    if (cmd === 'coffee') {
      setTimeout(() => {
        setLines((prev) => [...prev, { type: 'output', text: '☕ here you go!' }])
      }, 900)
    }

    if (cmd === 'matrix') {
      setTimeout(() => {
        setMatrixActive(true)
        setTimeout(() => {
          setMatrixActive(false)
          setLines((prev) => [...prev, { type: 'output', text: 'back to reality.' }])
        }, 4000)
      }, 400)
    }

    if (cmd === 'error') {
      setTimeout(() => {
        const bodyEl = terminalBodyRef.current
        const cs = bodyEl ? getComputedStyle(bodyEl) : null
        const fontSize = cs ? parseFloat(cs.fontSize) : 16
        const lineHeight = cs && parseFloat(cs.lineHeight) ? parseFloat(cs.lineHeight) : fontSize * 1.6
        const charWidth = fontSize * 0.6 // monospace glyphs are roughly 0.6x their font-size wide

        const rows = bodyEl ? Math.ceil(bodyEl.clientHeight / lineHeight) + 2 : 20
        const cols = bodyEl ? Math.ceil(bodyEl.clientWidth / charWidth) : 60

        // Keep the total fill time roughly constant regardless of window
        // size. Browsers won't reliably fire a timer faster than ~4ms, so
        // for a large terminal (thousands of characters) a fixed per-char
        // delay would blow way past the target duration — instead we fix
        // the tick rate and add more characters per tick as needed.
        const TOTAL_FILL_MS = 3500
        const TICK_MS = 16
        const totalChars = rows * cols
        const targetTicks = Math.max(1, Math.round(TOTAL_FILL_MS / TICK_MS))
        const charsPerTick = Math.max(1, Math.ceil(totalChars / targetTicks))

        let rowCount = 0
        let current = ''

        const charInterval = setInterval(() => {
          for (let n = 0; n < charsPerTick && rowCount < rows; n += 1) {
            current += Math.random() > 0.5 ? '1' : '0'
            if (current.length >= cols) {
              const finishedRow = current
              setLines((prev) => [...prev, { type: 'output', text: finishedRow }])
              current = ''
              rowCount += 1
            }
          }
          setErrorFillLine(current)

          if (rowCount >= rows) {
            clearInterval(charInterval)
            setTimeout(() => navigate('/signal-lost'), 400)
          }
        }, TICK_MS)
      }, 300)
    }
  }

  const handleTabComplete = () => {
    const word = value.trim().toLowerCase()
    if (!word || value.includes(' ')) return

    const matches = COMMANDS.filter((c) => c.startsWith(word))

    if (matches.length === 1) {
      setInputValue(matches[0])
    } else if (matches.length > 1) {
      setLines((prev) => [
        ...prev,
        { type: 'input', text: value },
        { type: 'output', text: matches.join('   ') },
      ])
    }
  }

  const handleHistoryNav = (direction) => {
    const history = historyRef.current
    if (history.length === 0) return

    const nextIndex = historyIndexRef.current + direction
    const clamped = Math.max(0, Math.min(history.length, nextIndex))
    historyIndexRef.current = clamped

    setInputValue(clamped === history.length ? '' : history[clamped])
  }

  const handleKeyDown = (e) => {
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
      sfx.key()
    }

    if (e.key === 'Enter') {
      runCommand(value)
      setValue('')
      setCursorPos(0)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      handleHistoryNav(-1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      handleHistoryNav(1)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      handleTabComplete()
    }
  }

  return (
    <div className={`terminal-page theme-${theme}`} onClick={focusInput}>
      <div className="terminal-window">
        <div className="terminal-titlebar">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
          <span className="terminal-title">guest@jasmine-portfolio: ~</span>
        </div>

        <div className="terminal-body" ref={terminalBodyRef}>
          {lines.map((line, i) => (
            <div key={i} className={`terminal-line terminal-line--${line.type}`}>
              {line.type === 'input' ? <span className="prompt">guest@jasmine-portfolio:~$ </span> : null}
              {line.text}
            </div>
          ))}

          {errorFillLine && <div className="terminal-line terminal-line--output">{errorFillLine}</div>}

          {booted && (
            <div className="terminal-line terminal-line--prompt">
              <span className="prompt">guest@jasmine-portfolio:~$ </span>
              <span className="terminal-typed">{value.slice(0, cursorPos)}</span>
              <span className="terminal-cursor" />
              <span className="terminal-typed">{value.slice(cursorPos)}</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <input
          ref={inputRef}
          className="terminal-input"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            syncCursor(e)
          }}
          onKeyDown={handleKeyDown}
          onKeyUp={syncCursor}
          onClick={syncCursor}
          spellCheck={false}
          autoComplete="off"
        />

        {matrixActive && <canvas ref={matrixCanvasRef} className="matrix-overlay" />}
      </div>
    </div>
  )
}

export default Terminal
