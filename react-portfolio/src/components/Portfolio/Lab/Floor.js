import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { floorVertexShader, floorFragmentShader } from './shaders'

const Floor = () => {
  const materialRef = useRef()
  const { camera } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCamPos: { value: new THREE.Vector3() },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uCamPos.value.copy(camera.position)
    }
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[120, 120, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={floorVertexShader}
        fragmentShader={floorFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

export default Floor
