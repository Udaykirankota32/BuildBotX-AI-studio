function ProjectCard({ project, onOpen, onDelete }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="project-card">
      <div className="project-card-preview">
        {project.generatedCode ? (
          <iframe
            sandBox=""
            srcDoc={project.generatedCode}
            title={project.title}
            className="project-card-iframe"
          />
        ) : (
          <div className="project-card-empty">No preview yet</div>
        )}
      </div>

      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-date">
          Updated {formatDate(project.updatedAt)}
        </p>

        <div className="project-card-actions">
          <button
            onClick={() => onOpen(project._id)}
            className="project-card-open-btn"
          >
            Open
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="project-card-delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
