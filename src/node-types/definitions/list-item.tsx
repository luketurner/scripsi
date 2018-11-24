import { map } from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { INodeType, NodeTypeProps } from '..';
import { NodeType } from '../../nodes';
import { ChildNodeList } from '../../ui/node-view/child-node-list';
import { NodeTextEditor } from '../../ui/node-view/node-text-editor';
import { NodeViewBase } from '../../ui/node-view/view-base';

const definition: INodeType = {
  component: ({ node, context }: NodeTypeProps) => {
    return (
      <NodeViewBase node={node} context={context}>
        <ul>
          <li>
            <NodeTextEditor node={node} context={context} />
          </li>
        </ul>
      </NodeViewBase>
    );
  }
};

export default definition;
