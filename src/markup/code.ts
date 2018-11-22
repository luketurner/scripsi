import { highlight, highlightAuto } from 'highlight.js';

export const codeToHtml = (code: string) => {
  return '<code>' + highlightAuto(code).value + '</code>';
};

export const codeFromHtml = (html: string) => {
  const root = new DOMParser().parseFromString(html, 'text/html');
  return root.body.textContent;
};
