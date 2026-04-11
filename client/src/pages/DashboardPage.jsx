import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import {
  getProjects,
  createProject,
  deleteProject,
} from '../services/projectService.js';
import '../styles/dashboard.css';

function DashboardPage() {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        showToast('Failed to load projects', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [showToast]);

  const handleNewProject = async () => {
    try {
      const newProject = await createProject();
      navigate(`/builder/${newProject._id}`);
    } catch (error) {
      showToast('Failed to create project', 'error');
    }
  };

  const handleOpenProject = (projectId) => {
    navigate(`/builder/${projectId}`);
  };

  const handleGenerateProject = () => {
    navigate('/generate');
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        setProjects(projects.filter((p) => p._id !== projectId));
        showToast('Project deleted', 'success');
      } catch (error) {
        showToast('Failed to delete project', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Projects</h1>
        <div className="dashboard-actions">
          <button onClick={handleGenerateProject} className="dashboard-generate-btn">
            Generate Project
          </button>
          <button onClick={handleNewProject} className="dashboard-new-btn">
            + New Project
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onOpen={handleOpenProject}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="dashboard-empty">
          <p className="dashboard-empty-subtitle">
            No projects yet. Create one to get started!
          </p>
          <button onClick={handleGenerateProject} className="dashboard-generate-btn">
            Generate Project
          </button>
          <button onClick={handleNewProject} className="dashboard-new-btn">
            Create First Project
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
