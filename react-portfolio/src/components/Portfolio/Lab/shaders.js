// Custom GLSL shaders for the Lab scene, tuned to the site's red/black
// chromatic-aberration identity established on Home (see Logo/index.scss).

export const floorVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

export const floorFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCamPos;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  float gridLine(vec2 coord, float thickness) {
    vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    float line = min(grid.x, grid.y);
    return 1.0 - clamp(line / thickness, 0.0, 1.0);
  }

  void main() {
    float dist = length(vWorldPos.xz - uCamPos.xz);
    float fade = 1.0 - smoothstep(10.0, 42.0, dist);

    vec2 coord = vWorldPos.xz * 0.5;
    float major = gridLine(coord, 1.1);
    float minor = gridLine(coord * 5.0, 1.6) * 0.35;
    float lines = max(major, minor);

    float pulse = sin(uTime * 0.6 - dist * 0.15) * 0.5 + 0.5;
    vec3 base = mix(vec3(0.06, 0.01, 0.01), vec3(0.20, 0.03, 0.03), pulse * 0.4);
    vec3 lineColor = vec3(1.0, 0.35, 0.28);

    vec3 color = mix(base, lineColor, lines * fade);
    float alpha = clamp(fade * (0.55 + lines * 0.5), 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`

export const nodeVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec3 pos = position;
    float wob = sin(uTime * 1.4 + pos.x * 3.0 + pos.y * 2.0) * 0.03 * (0.4 + uHover);
    pos += normal * wob;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vec4 viewPos = viewMatrix * worldPos;

    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);

    gl_Position = projectionMatrix * viewPos;
  }
`

export const nodeFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.4);
    float shift = 0.015 + uHover * 0.02;

    vec3 base = mix(uColorA, uColorB, fresnel);
    vec3 chromaR = base + vec3(shift, 0.0, 0.0);
    vec3 chromaB = base - vec3(0.0, 0.0, shift);
    vec3 color = (chromaR + base + chromaB) / 3.0;

    color += fresnel * (0.5 + uHover * 0.8) * vec3(1.0, 0.3, 0.25);
    float alpha = 0.55 + fresnel * 0.45 + uHover * 0.15;

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`
