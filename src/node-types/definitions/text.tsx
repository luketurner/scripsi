import * as React from 'react';

import { INodeType, NodeTypeProps } from '..';
import { NodeTextEditor } from '../../ui/node-view/node-text-editor';

const definition: INodeType = {
  component: ({ node, context }: NodeTypeProps) => {
    return (
      <NodeTextEditor node={node} context={context} />
    );
  },
};

export default definition;
