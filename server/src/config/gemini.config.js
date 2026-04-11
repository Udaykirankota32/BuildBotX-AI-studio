import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL_NAME = 'gemini-2.5-flash';

export const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    if (response.candidates && response.candidates[0]) {
      const content = response.candidates[0].content;
      if (content.parts && content.parts[0]) {
        return content.parts[0].text;
      }
    }

    throw new Error('No response from Gemini');
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
};
