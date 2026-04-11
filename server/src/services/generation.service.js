import { askGemini } from './gemini.service.js';
import { getProjectById, updateProject } from './project.service.js';
import { buildGenerationPrompt } from '../constants/prompts.js';
import { parseGenerationResponse } from '../utils/code.utils.js';

export const generateCode = async (projectId, userId, userPrompt) => {
  try {
    const project = await getProjectById(projectId, userId);

    const fullPrompt = buildGenerationPrompt(
      project.messages,
      project.generatedCode,
      userPrompt
    );

    const aiResponse = await askGemini(fullPrompt);

    const { code, description } = parseGenerationResponse(aiResponse);

    // Add user message
    project.messages.push({
      role: 'user',
      content: userPrompt,
      timestamp: new Date(),
    });

    // Add assistant message
    project.messages.push({
      role: 'assistant',
      content: description,
      timestamp: new Date(),
    });

    // Archive old code as version
    if (project.generatedCode) {
      project.versions.push({
        code: project.generatedCode,
        createdAt: new Date(),
      });
    }

    // Update generated code
    project.generatedCode = code;

    // Auto-set title from first message if not set
    if (
      project.title === 'Untitled Project' &&
      project.messages.length === 2
    ) {
      project.title = userPrompt.substring(0, 50) + '...';
    }

    await project.save();

    return {
      message: {
        role: 'assistant',
        content: description,
        timestamp: new Date(),
      },
      code,
      project,
    };
  } catch (error) {
    console.error('Code generation error:', error);
    throw error;
  }
};
