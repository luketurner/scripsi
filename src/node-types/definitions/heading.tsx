import * as React from 'react';

import { INodeType, NodeTypeProps } from '..';
import { NodeType } from '../../nodes';
import { NodeTextEditor } from '../../ui/node-view/node-text-editor';

const definition: INodeType = {
  component: ({ node, context }) => {
    return (
      <h1>
        <NodeTextEditor node={node} context={context} newNodePosition='child' newNodeType={NodeType.Text} />
      </h1>
    );
  },
  container: ({ children }) => (
    <section>
      {children}
    </section>
  ),
};

export default definition;
