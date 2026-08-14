import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/Layout'
import Portfolio from './components/Portfolio'
import Dashboard from './components/Dashboard'
import Terminal from './components/Terminal'
import NotFound from './components/NotFound'
import Lab from './components/Portfolio/Lab'
import { sfx } from './utils/sfx'
import { initSiteStats } from './utils/stats'
import './App.scss'

function App() {
  useEffect(() => {
    const handleClick = (e) => {
      const clickable = e.target.closest('button, a')
      if (!clickable) return
      if (clickable.closest('.terminal-page, .bouncing-logo')) return
      sfx.click()
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => initSiteStats(), [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/portfolio/lab" element={<Lab />} />
      </Routes>
    </>
  )
}

export default App