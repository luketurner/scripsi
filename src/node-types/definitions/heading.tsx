import { map } from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { INodeType, NodeTypeProps } from '..';
import { NodeType } from '../../nodes';
import { ChildNodeList } from '../../ui/node-view/child-node-list';
import { NodeTextEditor } from '../../ui/node-view/node-text-editor';

const definition: INodeType = {
  component: observer(({ node, ancestry, isVisible }: NodeTypeProps) => {
    return (
      <section>
        <h1>{isVisible && <NodeTextEditor node={node} ancestry={ancestry} newNodePosition='child' newNodeType={NodeType.Text} />}</h1>
        <ChildNodeList node={node} ancestry={ancestry} />
      </section>
    );
  })
};

export default definition;
