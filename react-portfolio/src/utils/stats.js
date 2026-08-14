import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  increment,
  serverTimestamp,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

const VIEWS_DOC = doc(db, 'stats', 'views')
const HEARTBEAT_INTERVAL_MS = 10000
const ONLINE_WINDOW_MS = 20000

const SESSION_KEY = 'siteSessionId'

// Stable per-tab session id, persisted in sessionStorage so a reload reuses
// the same presence document instead of creating a new "ghost" one each
// time (sessionStorage survives reloads but is unique per tab, and clears
// when the tab closes).
const getSessionId = () => {
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = `s_${Date.now()}_${Math.random().toString(36).slice(2)}`
      window.sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return `s_${Date.now()}_${Math.random().toString(36).slice(2)}`
  }
}

const sessionId = getSessionId()
const presenceRef = doc(db, 'presence', sessionId)

// Bumps the total view count once and starts a presence heartbeat for this
// tab. Call once near the root of the app — every route benefits from it,
// including the standalone Terminal page. Fails silently if Firestore isn't
// reachable/enabled yet.
let hasIncrementedViews = false

export const initSiteStats = () => {
  if (!hasIncrementedViews) {
    hasIncrementedViews = true
    // Guarded by the module-level flag above (not a ref/state) so a real
    // page load only counts once even though React.StrictMode intentionally
    // mounts effects twice in development.
    setDoc(VIEWS_DOC, { count: increment(1) }, { merge: true }).catch(() => {})
  }

  const beat = () => {
    setDoc(presenceRef, { lastSeen: serverTimestamp() }).catch(() => {})
  }
  beat()
  const interval = setInterval(beat, HEARTBEAT_INTERVAL_MS)

  const cleanup = () => {
    clearInterval(interval)
    deleteDoc(presenceRef).catch(() => {})
  }
  window.addEventListener('beforeunload', cleanup)

  return () => {
    window.removeEventListener('beforeunload', cleanup)
    cleanup()
  }
}

export const subscribeViewCount = (callback) => {
  try {
    return onSnapshot(
      VIEWS_DOC,
      (snap) => callback(snap.exists() ? snap.data().count || 0 : 0),
      () => callback(null)
    )
  } catch {
    callback(null)
    return () => {}
  }
}

export const getViewCountOnce = async () => {
  try {
    const snap = await getDoc(VIEWS_DOC)
    return snap.exists() ? snap.data().count || 0 : 0
  } catch {
    return null
  }
}

const POLL_TIMEOUT_MS = 8000

export const subscribeLiveCount = (callback) => {
  const poll = async () => {
    try {
      const cutoff = Timestamp.fromMillis(Date.now() - ONLINE_WINDOW_MS)
      const q = query(collection(db, 'presence'), where('lastSeen', '>', cutoff))
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timed out')), POLL_TIMEOUT_MS)
      )
      const snap = await Promise.race([getDocs(q), timeout])
      callback(snap.size)
    } catch {
      // Query timed out or failed (Firestore unreachable, rules not set up
      // yet, etc.) — leave the live count hidden rather than hang forever.
      callback(null)
    }
  }
  poll()
  const interval = setInterval(poll, 5000)
  return () => clearInterval(interval)
}
