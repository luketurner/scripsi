import { highlight, highlightAuto, listLanguages } from 'highlight.js';

export const codeToHtml = (code: string, { language = null, interpretHints = true } = {}) => {
  if (language) return `<code>${highlight(language, code).value}</code>`;

  if (interpretHints) {
    const langRegex = /^([\w-.]+):\s/g;
    const match = langRegex.exec(code);
    if (match && listLanguages().includes(match[1])) {
      const restOfCode = code.substring(langRegex.lastIndex);
      return `<code>${highlight(match[1], restOfCode).value}</code>`;
    }
  }

  return `<code>${highlightAuto(code).value}</code>`;
};

export const codeFromHtml = (html: string) => {
  const root = new DOMParser().parseFromString(html, 'text/html');
  return root.body.textContent;
};
