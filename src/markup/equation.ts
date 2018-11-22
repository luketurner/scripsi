import { renderToString } from 'katex';

export const equationToHtml = (eq: string) => renderToString(eq);

export const htmlToEquation = (html: string) => {
  const root = new DOMParser().parseFromString(html, 'text/html');

  if (!root.body || root.body.className !== 'katex') return '';

  return root.body.querySelector('math > semantics > annotation').textContent;
};
