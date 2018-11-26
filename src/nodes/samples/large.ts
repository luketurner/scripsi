import { range } from 'lodash/fp';
import { NodeType } from '..';
import { makeIndex } from '.';


const makeChildTree = (count, collapsed = false) => range(0, count).map(i => ({
  content: `child number ${i}`,
  children: makeChildTree(--count),
  collapsed
}));

export const largeDocument = () => {
  return makeIndex({
    content: 'Large Document',
    type: NodeType.Heading,
    children: makeChildTree(10, true),
  });
};
