import * as React from 'react';

import { INodeType, NodeTypeProps } from '..';
import { NodeType } from '../../nodes';
import { NodeTextEditor } from '../../ui/node-view/node-text-editor';
import { NodeViewBase } from '../../ui/node-view/view-base';

const definition: INodeType = {
  component: ({ node, context }: NodeTypeProps) => {
    return (
      <section>
        <NodeViewBase node={node} context={context}>
          <h1>
            <NodeTextEditor node={node} context={context} newNodePosition='child' newNodeType={NodeType.Text} />
          </h1>
        </NodeViewBase>
      </section>
    );
  }
};

export default definition;
