import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const logoRef = useRef(null)

  const nameArray = ['J', 'a', 's', 'm', 'i', 'n', 'e']

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i</span>
            <span className={`${letterClass} _13`}>.</span>
            <br />
            <span className={`${letterClass} _14`}>I</span>
            <span className={`${letterClass} _15`}>'</span>
            <span className={`${letterClass} _16`}>m</span>
            <span className={`${letterClass} _17`}>&nbsp;</span>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={18}
            />
          </h1>
          <h2>I like coding</h2>
          <div className="button-row">
            <Link to="/contact" className="flat-button">
              CONTACT ME
            </Link>
            <Link to="/terminal" className="flat-button">
              HOME
            </Link>
          </div>
          <button
            type="button"
            className="clear-button"
            onClick={() => logoRef.current?.reset()}
          >
            CLEAR
          </button>
        </div>
        <Logo ref={logoRef} />
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Home