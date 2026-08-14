import { useMemo } from 'react'
import * as THREE from 'three'

// A large inverted cylinder behind everything, fading from deep red at the
// horizon line to black overhead — stops the scene reading as an object
// floating in an empty void.
const Horizon = () => {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      uniforms: {},
      vertexShader: /* glsl */ `
        varying float vY;
        void main() {
          vY = position.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vY;
        void main() {
          float t = clamp((vY + 30.0) / 60.0, 0.0, 1.0);
          vec3 low = vec3(0.16, 0.022, 0.02);
          vec3 high = vec3(0.02, 0.004, 0.004);
          vec3 color = mix(low, high, pow(t, 0.4));
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })
  }, [])

  return (
    <mesh position={[0, 20, 0]} material={material}>
      <cylinderGeometry args={[95, 95, 60, 48, 1, true]} />
    </mesh>
  )
}

export default Horizon
