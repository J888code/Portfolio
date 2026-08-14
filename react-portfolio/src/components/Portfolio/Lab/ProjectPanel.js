const ProjectPanel = ({ project, onClose }) => {
  if (!project) return null

  return (
    <div className="lab-panel">
      <button className="lab-panel__close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      <p className="lab-panel__eyebrow">Project node</p>
      <h2 className="lab-panel__title">{project.name}</h2>
      <p className="lab-panel__desc">{project.description}</p>
      {project.url && (
        <button className="lab-panel__link" onClick={() => window.open(project.url, '_blank')}>
          View project
        </button>
      )}
      <button className="lab-panel__back" onClick={onClose}>
        &larr; back to the lab
      </button>
    </div>
  )
}

export default ProjectPanel
