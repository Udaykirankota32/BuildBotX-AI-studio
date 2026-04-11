import Project from '../models/Project.model.js';

export const getUserProjects = async (userId) => {
  const projects = await Project.find({ userId }).sort({ updatedAt: -1 });
  return projects;
};

export const getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }
  return project;
};

export const createProject = async (userId, title = 'Untitled Project') => {
  const project = new Project({
    userId,
    title,
    messages: [],
    generatedCode: '',
    versions: [],
  });

  await project.save();
  return project;
};

export const updateProject = async (projectId, userId, updateData) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId },
    updateData,
    { new: true }
  );

  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }

  return project;
};

export const deleteProject = async (projectId, userId) => {
  const project = await Project.findOneAndDelete({
    _id: projectId,
    userId,
  });

  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }

  return project;
};
