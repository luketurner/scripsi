import { NodeType } from '..';
import { makeIndex } from '.';

export const largeDocument = () => {
  return makeIndex({
    content: 'Large Document',
    type: NodeType.Heading,
    children: [
      {
        content: 'Text Nodes'
      }
    ]
  });
};
