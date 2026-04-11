import * as projectService from '../services/project.service.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getUserProjects(req.user._id);
    return res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { title } = req.body;
    const project = await projectService.createProject(
      req.user._id,
      title || 'Untitled Project'
    );
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id, req.user._id);
    return res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.updateProject(
      id,
      req.user._id,
      req.body
    );
    return res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await projectService.deleteProject(id, req.user._id);
    return res.json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
