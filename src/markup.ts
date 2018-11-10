/* Markup module

Provides functions to convert the Markdown-esque markup used in node content into HTML for rendering, and back.

*/

export const htmlToText = (html: string): string => {

  // using DOMParser to avoid JS execution (credit to https://stackoverflow.com/questions/1912501#34064434)
  const root = new DOMParser().parseFromString(html, 'text/html');

  // recursive function for converting each node to its markdowny equivalent
  const nodeToText = (node: HTMLElement): string => {
    if (node.childNodes.length === 0) return node.textContent;

    const childContent = Array.from(node.childNodes).map(nodeToText).join('');

    if (node.tagName === 'STRONG') return '*' + childContent + '*';
    if (node.tagName === 'EM') return '_' + childContent + '_';
    if (node.tagName === 'A' && /^#\w+$/g.test(node.getAttribute('href'))) return childContent;
    if (node.tagName === 'A') return `[${childContent}](${node.getAttribute('href')})`;
    return childContent;
  };

  return nodeToText(root.body);
};

export const textToHtml = (text: string, selection?: Selection): string => {
  return text
  .replace(/(^|\s)_(.*?[^\\])_(?!\S)/g, '$1<em>$2</em>')
  .replace(/(^|\s)\*(.*?[^\\])\*(?!\S)/g, '$1<strong>$2</strong>')
  .replace(/(^|\s)\[(.*?[^\\])\]\((.*?[^\\])\)(?!\S)/g, '$1<a href="$3">$2</a>')
  .replace(/(^|\s)#([a-zA-Z]\w*)\b/g, '$1<a href="#$2">#$2</a>');
};