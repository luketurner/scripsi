import * as React from 'react';

import { INodeType, NodeTypeProps } from '..';
import { NodeTextEditor } from '../../ui/node-view/node-text-editor';
import { NodeViewBase } from '../../ui/node-view/view-base';

const definition: INodeType = {
  component: ({ node, context }: NodeTypeProps) => {
    return (
      <NodeViewBase node={node} context={context}>
        <NodeTextEditor node={node} context={context} />
      </NodeViewBase>
    );
  }
};

export default definition;
