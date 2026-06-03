import { generateContent } from '../config/gemini.config.js';

const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);
const MAX_RETRIES = Number(process.env.GEMINI_MAX_RETRIES || 3);
const BASE_DELAY_MS = Number(process.env.GEMINI_RETRY_BASE_DELAY_MS || 600);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getErrorStatusCode = (error) => {
  if (typeof error?.status === 'number') return error.status;
  if (typeof error?.statusCode === 'number') return error.statusCode;
  if (typeof error?.code === 'number') return error.code;
  if (typeof error?.error?.code === 'number') return error.error.code;
  return null;
};

const isRetryableError = (error) => RETRYABLE_STATUS_CODES.has(getErrorStatusCode(error));

const buildGeminiError = (error) => {
  const statusCode = getErrorStatusCode(error);

  if (statusCode === 503) {
    const serviceError = new Error('Gemini is currently under high demand. Please try again in a moment.');
    serviceError.statusCode = 503;
    return serviceError;
  }

  if (statusCode === 429) {
    const rateLimitError = new Error('Gemini rate limit reached. Please retry shortly.');
    rateLimitError.statusCode = 429;
    return rateLimitError;
  }

  const genericError = new Error('Failed to generate code. Please try again.');
  genericError.statusCode = statusCode && statusCode >= 400 ? statusCode : 502;
  return genericError;
};

export const askGemini = async (prompt) => {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await generateContent(prompt);
      if (!response) {
        throw new Error('Gemini returned an empty response');
      }
      return response;
    } catch (error) {
      lastError = error;
      const retryable = isRetryableError(error);

      if (!retryable || attempt === MAX_RETRIES) {
        break;
      }

      const backoffMs = BASE_DELAY_MS * (2 ** attempt);
      const jitterMs = Math.floor(Math.random() * 250);
      await wait(backoffMs + jitterMs);
    }
  }

  console.error('Error calling Gemini:', lastError);
  throw buildGeminiError(lastError);
};
