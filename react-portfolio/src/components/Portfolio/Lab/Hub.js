import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { nodeVertexShader, nodeFragmentShader } from './shaders'

const Hub = () => {
  const meshRef = useRef()
  const materialRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0.35 },
      uColorA: { value: new THREE.Color('#1a0505') },
      uColorB: { value: new THREE.Color('#ff8a6e') },
    }),
    []
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (materialRef.current) materialRef.current.uniforms.uTime.value = t
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1
    }
  })

  return (
    <group position={[0, 1.6, 0]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.1, 2]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={nodeVertexShader}
          fragmentShader={nodeFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color="#3d0c0c" transparent opacity={0.5} />
      </mesh>
      <pointLight color="#ff5c4d" intensity={4} distance={8} />
    </group>
  )
}

export default Hub
