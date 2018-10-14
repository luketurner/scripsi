import { map } from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { INodeType, NodeTypeProps } from '..';
import { ChildNodeList } from '../../ui/node-view/child-node-list';
import { NodeTextEditor } from '../../ui/node-view/node-text-editor';

const definition: INodeType = {
  component: observer(({ node, ancestry, isVisible }: NodeTypeProps) => {
    return (
      <div>
        {isVisible && <NodeTextEditor node={node} ancestry={ancestry} />}
        <ChildNodeList node={node} ancestry={ancestry} />
      </div>
    );
  })
};

export default definition;
