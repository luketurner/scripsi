import { makeIndex } from '.';
import { NodeType } from '..';

export const featuresDocument = () => {
  return makeIndex({
    content: 'Feature Demo',
    type: NodeType.Heading,
    children: [{
      content: 'Text Node Features',
      children: [{
        content: 'Rich Text',
        children: [
          { content: 'This is **bold** and __this__ is too.' },
          { content: 'This is *italic* and _this_ is too.' },
          { content: 'Type code: `const x = 12;` and specify the language: `js: const x = 12;` or `pascal: const x = 12;`' },
          { content: 'You can do math with ~$...$~, e.g. $x^2 + \\frac{x}{2}$' },
        ]
      }]
    }]
  });
};
