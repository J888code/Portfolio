import { useEffect, useState, Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../../firebase'
import Scene from './Scene'
import LoadingScreen from './LoadingScreen'
import ProjectPanel from './ProjectPanel'
import MobileFallback from './MobileFallback'
import './index.scss'

// Same content the Portfolio page reads from Firestore, so the Lab never
// invents projects — if the collection is empty this repo's own real work
// fills in rather than placeholder copy.
const FALLBACK_PROJECTS = [
  {
    id: 'fallback-portfolio',
    name: 'This portfolio',
    description: 'React 19 + Firebase site this Lab lives inside of — routing, terminal easter egg, live stats.',
    url: '',
  },
  {
    id: 'fallback-chat-app',
    name: 'chat-app',
    description: 'A real-time chat client built with vanilla JS.',
    url: '',
  },
  {
    id: 'fallback-sort-searches',
    name: 'sort_searches_website',
    description: 'Sorting and search algorithms, visualized.',
    url: '',
  },
]

const isLowPower = () => {
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const smallViewport = Math.min(window.innerWidth, window.innerHeight) < 560
  const fewCores = (navigator.hardwareConcurrency || 8) <= 4
  return coarsePointer && (smallViewport || fewCores)
}

const Lab = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState(null)
  const [active, setActive] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [lowPower] = useState(isLowPower)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const snap = await getDocs(collection(db, 'portfolio'))
        const docs = snap.docs.map((d, i) => ({ id: d.id || `p${i}`, ...d.data() }))
        if (!cancelled) setProjects(docs.length ? docs : FALLBACK_PROJECTS)
      } catch {
        if (!cancelled) setProjects(FALLBACK_PROJECTS)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const projectList = useMemo(() => projects || [], [projects])

  return (
    <div className="lab-page">
      <button className="lab-page__exit" onClick={() => navigate('/portfolio')}>
        &larr; portfolio
      </button>

      {!loaded && projects && <LoadingScreen onDone={() => setLoaded(true)} />}

      {projects && loaded && lowPower && (
        <MobileFallback projects={projectList} onSelect={setActive} />
      )}

      {projects && loaded && !lowPower && (
        <>
          <Canvas
            className="lab-canvas"
            camera={{ position: [0, 5, 9], fov: 50 }}
            dpr={[1, 1.8]}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
          >
            <Suspense fallback={null}>
              <Scene projects={projectList} active={active} onSelect={setActive} />
            </Suspense>
          </Canvas>
          {!active && (
            <p className="lab-page__hint">drag to orbit &middot; click a node to open it</p>
          )}
        </>
      )}

      <ProjectPanel project={active} onClose={() => setActive(null)} />
    </div>
  )
}

export default Lab
