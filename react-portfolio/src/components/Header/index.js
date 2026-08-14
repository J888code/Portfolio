import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faGithub,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faEnvelope,
  faSuitcase,
  faEye,
  faCircle,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'
import { subscribeViewCount, subscribeLiveCount } from '../../utils/stats'
import { isMuted, toggleMuted, onMuteChange } from '../../utils/sfx'
import './index.scss'

const Header = () => {
  const [views, setViews] = useState(null)
  const [live, setLive] = useState(null)
  const [muted, setMutedState] = useState(isMuted())

  useEffect(() => {
    const unsubViews = subscribeViewCount(setViews)
    const unsubLive = subscribeLiveCount(setLive)
    const unsubMute = onMuteChange(setMutedState)
    return () => {
      unsubViews()
      unsubLive()
      unsubMute()
    }
  }, [])

  return (
    <header className="site-header">
      <div className="header-left">
        <Link className="header-logo" to="/">
          Jasmine
        </Link>

        <div className="header-stats">
          {live !== null && (
            <span className="header-stat header-stat--live" title="visitors here right now">
              <FontAwesomeIcon icon={faCircle} className="live-dot" />
              {live}
            </span>
          )}
          {views !== null && (
            <span className="header-stat" title="total views">
              <FontAwesomeIcon icon={faEye} />
              {views.toLocaleString()}
            </span>
          )}
          <button
            type="button"
            className="header-mute"
            onClick={toggleMuted}
            aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
          >
            <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
          </button>
        </div>
      </div>

      <nav className="header-nav">
        <NavLink exact="true" activeclassname="active" to="/">
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="about-link" to="/about">
          <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="portfolio-link" to="/portfolio">
          <FontAwesomeIcon icon={faSuitcase} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="contact-link" to="/contact">
          <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
        </NavLink>
      </nav>

      <ul className="header-socials">
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" className="anchor-icon" />
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faGithub} color="#4d4d4e" className="anchor-icon" />
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faYoutube} color="#4d4d4e" className="anchor-icon" />
          </a>
        </li>
      </ul>
    </header>
  )
}

export default Header
