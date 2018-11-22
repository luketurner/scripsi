import { equationToHtml, equationFromHtml } from './equation';

/* Markup module

Provides functions to convert the Markdown-esque markup used in node content into HTML for rendering, and back.

*/

export const textFromHtml = (html: string): string => {

  // using DOMParser to avoid JS execution (credit to https://stackoverflow.com/questions/1912501#34064434)
  const root = new DOMParser().parseFromString(html, 'text/html');

  const escape = x => x; // TODO -- escape *, _, etc.

  // recursive function for converting each node to its markdowny equivalent
  const nodeToText = (node: HTMLElement): string => {
    if (node.childNodes.length === 0) return escape(node.textContent);

    if (node.className === 'katex') return '$' + equationFromHtml(node.outerHTML) + '$';

    const childContent = Array.from(node.childNodes).map(nodeToText).join('');

    if (node.tagName === 'CODE') return '`' + childContent + '`';
    if (node.tagName === 'STRONG') return '**' + childContent + '**';
    if (node.tagName === 'EM') return '_' + childContent + '_';
    if (node.tagName === 'A' && /^#\w+$/g.test(node.getAttribute('href'))) return childContent;
    if (node.tagName === 'A') return `[${childContent}](${node.getAttribute('href')})`;
    return childContent;
  };

  return nodeToText(root.body);
};

export const textToHtml = (text: string): string => {
  return text
  .replace(/(^|[^\\])`(.*?[^\\])`/g, '$1<code>$2</code>')
  .replace(/(^|[^\\])(__|\*\*)(.*?[^\\])\2/g, '$1<strong>$3</strong>')
  .replace(/(^|[^\\])(_|\*)(.*?[^\\])\2/g, '$1<em>$3</em>')
  .replace(/(^|\s)\[(.*?[^\\])\]\((.*?[^\\])\)/g, '$1<a href="$3">$2</a>')
  .replace(/(^|\s)#([a-zA-Z]\w*)\b/g, '$1<a href="#$2">#$2</a>')
  .replace(/(^|[^\\])\$(.*?[^\\])\$/g, (_, p, c) => `${p}${equationToHtml(c)}`)
  .replace(/\\([*_[#\\`$])/g, '$1');
};
