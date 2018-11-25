import { observer } from 'mobx-react-lite';
import * as React from 'react';

import classNames = require('classnames');
import { NodeContext } from '.';
import { state } from '..';
import { SNode } from '../../nodes';
import { NodeViewAnchor } from './anchor';
import { ChildNodeList } from './child-node-list';
import { NodeDragAnchor } from './node-drag-anchor';
import { NodeDropTarget } from './node-drop-target';
import { NodeMenu } from './node-menu';

export interface NodeViewProps {
  node: SNode;
  context: NodeContext;
  customMenuEntries?: React.ReactNode;
  customChildNodes?: React.ReactNode;
  children: React.ReactNode;
}

export const NodeViewBase = observer(({ node, context, customMenuEntries, customChildNodes, children }: NodeViewProps) => {
  const { isVisible, isOutlined } = context;
  return (
    <NodeDropTarget node={node} context={context}>
      <div className={classNames('p-1', isOutlined && ['bg-blue-lightest', 'highlight-children'])}>

        <NodeMenu node={node} context={context} customMenuEntries={customMenuEntries}>
          <NodeDragAnchor node={node} context={context}>
            <NodeViewAnchor node={node} context={context} />
          </NodeDragAnchor>
        </NodeMenu>

        {isVisible && children}

        {customChildNodes || <ChildNodeList node={node} context={context} />}
      </div>
    </NodeDropTarget>
  );
});
