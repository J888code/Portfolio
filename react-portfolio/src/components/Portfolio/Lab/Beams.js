import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Thin light beams from the central hub out to each project node, plus a
// pulse travelling along them — gives the ring a visible structure instead
// of unrelated shapes sharing a floor.
const Beams = ({ nodes }) => {
  const pulseRefs = useRef([])

  const segments = useMemo(
    () =>
      nodes.map(({ pos }) => {
        const start = new THREE.Vector3(0, 1.6, 0)
        const end = new THREE.Vector3(pos[0], pos[1], pos[2])
        const mid = start.clone().add(end).multiplyScalar(0.5)
        const dir = end.clone().sub(start)
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        )
        return { mid, len: dir.length(), quat, start, end }
      }),
    [nodes]
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    segments.forEach((seg, i) => {
      const pulse = pulseRefs.current[i]
      if (!pulse) return
      const p = (t * 0.3 + i * 0.23) % 1
      pulse.position.lerpVectors(seg.start, seg.end, p)
      pulse.material.opacity = Math.sin(p * Math.PI) * 0.9
    })
  })

  return (
    <group>
      {segments.map((seg, i) => (
        <group key={i}>
          <mesh position={seg.mid} quaternion={seg.quat}>
            <cylinderGeometry args={[0.008, 0.008, seg.len, 5]} />
            <meshBasicMaterial color="#ff5c4d" transparent opacity={0.28} depthWrite={false} />
          </mesh>
          <mesh ref={(el) => (pulseRefs.current[i] = el)}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffb4a4" transparent depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default Beams
