import { sfx } from '../../../utils/sfx'

// Low-power devices skip the full WebGL scene entirely rather than running
// a stuttery version of it — a CSS-only card list keeps the same red/glitch
// identity and the same project data without touching the GPU.
const MobileFallback = ({ projects, onSelect }) => {
  return (
    <div className="lab-fallback">
      <div className="lab-fallback__glyph">
        <span className="lab-fallback__glyph-layer lab-fallback__glyph-red">J</span>
        <span className="lab-fallback__glyph-layer lab-fallback__glyph-blue">J</span>
        <span className="lab-fallback__glyph-layer lab-fallback__glyph-base">J</span>
      </div>
      <p className="lab-fallback__note">
        The full 3D lab needs more GPU than this device wants to spend &mdash; here's the project
        list instead.
      </p>
      <div className="lab-fallback__list">
        {projects.map((project) => (
          <button
            key={project.id}
            className="lab-fallback__card"
            onClick={() => {
              sfx.click()
              onSelect(project)
            }}
          >
            <span className="lab-fallback__card-name">{project.name}</span>
            <span className="lab-fallback__card-desc">{project.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileFallback
