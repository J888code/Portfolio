import { Link, useLocation } from 'react-router-dom'
import './index.scss'

const KNOWN_ROUTES = ['/', '/about', '/contact', '/portfolio', '/terminal']

const levenshtein = (a, b) => {
  const rows = a.length + 1
  const cols = b.length + 1
  const grid = Array.from({ length: rows }, (_, i) => [i, ...Array(cols - 1).fill(0)])
  for (let j = 1; j < cols; j += 1) grid[0][j] = j

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      grid[i][j] = Math.min(grid[i - 1][j] + 1, grid[i][j - 1] + 1, grid[i - 1][j - 1] + cost)
    }
  }

  return grid[rows - 1][cols - 1]
}

const closestRoute = (path) => {
  let best = null
  let bestDist = Infinity
  KNOWN_ROUTES.forEach((route) => {
    const dist = levenshtein(path, route)
    if (dist < bestDist) {
      bestDist = dist
      best = route
    }
  })
  return bestDist <= 4 && best !== '/' ? best : null
}

const NotFound = () => {
  const location = useLocation()
  const suggestion = closestRoute(location.pathname)

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <p className="not-found-eyebrow">ERROR 404</p>

        <div className="glitch-heading">
          <span className="glitch-layer glitch-red" aria-hidden="true">
            SIGNAL LOST
          </span>
          <span className="glitch-layer glitch-blue" aria-hidden="true">
            SIGNAL LOST
          </span>
          <span className="glitch-base">SIGNAL LOST</span>
        </div>

        <p className="not-found-text">
          This page doesn't exist — the signal's gone dark somewhere out here.
        </p>

        {suggestion && (
          <p className="not-found-suggestion">
            Did you mean <Link to={suggestion}>{suggestion}</Link>?
          </p>
        )}

        <div className="not-found-actions">
          <Link to="/" className="flat-button">
            BACK TO SAFETY
          </Link>
          <Link to="/terminal" className="flat-button flat-button--ghost">
            OR TRY THE TERMINAL
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
