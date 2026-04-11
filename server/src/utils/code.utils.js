export const parseGenerationResponse = (responseText) => {
  let code = '';
  let description = '';

  const htmlMarker = '```html';
  const startIndex = responseText.indexOf(htmlMarker);

  if (startIndex !== -1) {
    description = responseText.slice(0, startIndex).trim();
    const codeStart = startIndex + htmlMarker.length;
    const endIndex = responseText.indexOf('```', codeStart);

    if (endIndex !== -1) {
      code = responseText.slice(codeStart, endIndex).trim();
    } else {
      code = responseText.slice(codeStart).trim();
    }
  } else {
    const genericStart = responseText.indexOf('```');
    if (genericStart !== -1) {
      description = responseText.slice(0, genericStart).trim();
      const codeStart = genericStart + 3;
      const endIndex = responseText.indexOf('```', codeStart);

      if (endIndex !== -1) {
        code = responseText.slice(codeStart, endIndex).trim();
      } else {
        code = responseText.slice(codeStart).trim();
      }

      // Remove language specifier if present
      const lines = code.split('\n');
      if (lines[0] && !lines[0].includes('<') && !lines[0].includes('!')) {
        code = lines.slice(1).join('\n');
      }
    } else {
      description = responseText;
    }
  }

  return { code, description };
};
