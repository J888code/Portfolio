import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import { nodeVertexShader, nodeFragmentShader } from './shaders'
import { sfx } from '../../../utils/sfx'

const GEOMETRIES = [
  <icosahedronGeometry args={[0.55, 1]} />,
  <octahedronGeometry args={[0.62, 0]} />,
  <dodecahedronGeometry args={[0.55, 0]} />,
  <torusKnotGeometry args={[0.36, 0.13, 90, 14]} />,
  <tetrahedronGeometry args={[0.72, 0]} />,
  <torusGeometry args={[0.45, 0.16, 12, 32]} />,
]

const ProjectNode = ({ project, angle, radius, index, onSelect, isActive }) => {
  const meshRef = useRef()
  const materialRef = useRef()
  const [hovered, setHovered] = useState(false)
  const hoverT = useRef(0)

  const position = useMemo(() => {
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    return [x, 1.4, z]
  }, [angle, radius])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uColorA: { value: new THREE.Color('#3d0c0c') },
      uColorB: { value: new THREE.Color('#ff5c4d') },
    }),
    []
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    hoverT.current = THREE.MathUtils.damp(hoverT.current, hovered || isActive ? 1 : 0, 6, delta)
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t
      materialRef.current.uniforms.uHover.value = hoverT.current
    }
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(t * 0.9 + angle * 3) * 0.15
      meshRef.current.rotation.y = t * 0.3
      const scale = 1 + hoverT.current * 0.25
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          sfx.click()
          onSelect(project, position)
        }}
      >
        {GEOMETRIES[index % GEOMETRIES.length]}
        <shaderMaterial
          ref={materialRef}
          vertexShader={nodeVertexShader}
          fragmentShader={nodeFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <Billboard position={[0, -0.95, 0]}>
        <Text
          fontSize={0.19}
          color="#ffd9d0"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.008}
          outlineColor="#1a0505"
          maxWidth={3}
          renderOrder={999}
        >
          {project.name}
          <meshBasicMaterial attach="material" color="#ffd9d0" depthTest={false} transparent />
        </Text>
      </Billboard>

      <mesh position={[0, -position[1] + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 24]} />
        <meshBasicMaterial
          color="#ff5c4d"
          transparent
          opacity={hovered || isActive ? 0.3 : 0.14}
          depthWrite={false}
        />
      </mesh>

      <pointLight color="#ff5c4d" intensity={hovered || isActive ? 3.5 : 1.2} distance={4} />
    </group>
  )
}

export default ProjectNode
