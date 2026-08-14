import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Floor from './Floor'
import Hub from './Hub'
import ProjectNode from './ProjectNode'
import Dust from './Dust'
import Horizon from './Horizon'
import Beams from './Beams'

const DEFAULT_CAM = new THREE.Vector3(0, 3.4, 8.2)
const DEFAULT_TARGET = new THREE.Vector3(0, 1.5, 0)

const Scene = ({ projects, active, onSelect }) => {
  const controlsRef = useRef()
  const focusPos = useRef(new THREE.Vector3())
  const focusTarget = useRef(new THREE.Vector3())

  const radius = 4.6

  useFrame((state, delta) => {
    const controls = controlsRef.current
    if (!controls) return

    if (active) {
      const [nx, ny, nz] = active.pos
      const outward = new THREE.Vector2(nx, nz)
      const len = outward.length() || 1
      const dirX = outward.x / len
      const dirZ = outward.y / len
      // Approach from a 3/4 angle (outward + tangential), not straight along
      // the ring's radius — a head-on approach puts the central hub directly
      // behind every node since they all ring around it.
      const tanX = -dirZ
      const tanZ = dirX
      focusPos.current.set(
        nx + dirX * 3.0 + tanX * 3.2,
        ny + 0.9,
        nz + dirZ * 3.0 + tanZ * 3.2
      )
      focusTarget.current.set(nx, ny, nz)
      state.camera.position.lerp(focusPos.current, 1 - Math.pow(0.001, delta))
      controls.target.lerp(focusTarget.current, 1 - Math.pow(0.001, delta))
      controls.enabled = false
    } else {
      controls.enabled = true
      state.camera.position.lerp(DEFAULT_CAM, 1 - Math.pow(0.02, delta))
    }
    controls.update()
  })

  const nodes = useMemo(
    () =>
      projects.map((project, i) => {
        const angle = (i / projects.length) * Math.PI * 2
        return { project, angle, pos: [Math.cos(angle) * radius, 1.4, Math.sin(angle) * radius] }
      }),
    [projects]
  )

  return (
    <>
      <color attach="background" args={['#0d0303']} />
      <fog attach="fog" args={['#1a0505', 14, 52]} />
      <ambientLight intensity={0.25} color="#ff8a6e" />
      <directionalLight position={[6, 8, 4]} intensity={0.4} color="#ff5c4d" />

      <Floor />
      <Hub />
      <Dust />
      <Horizon />
      <Beams nodes={nodes} />

      {nodes.map(({ project, angle, pos }, i) => (
        <ProjectNode
          key={project.id}
          project={project}
          angle={angle}
          radius={radius}
          index={i}
          isActive={active?.id === project.id}
          onSelect={(p) => onSelect({ ...p, pos })}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        target={DEFAULT_TARGET}
        enablePan={false}
        minDistance={4}
        maxDistance={16}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={0.3}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  )
}

export default Scene
