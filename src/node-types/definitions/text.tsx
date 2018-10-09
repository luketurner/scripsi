import { map } from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { NodeTextEditor } from '../../ui/editor';
import { NodeType } from '../../nodes';
import { INodeType, NodeTypeProps } from '..';
import { ChildNodeList } from '../util/child-node-list';

const definition: INodeType = {
  component: observer(({ node }: NodeTypeProps) => {
    return (
      <div>
        {node.isVisible && <NodeTextEditor node={node} />}
        <ChildNodeList node={node} />
      </div>
    );
  })
};

export default definition;
