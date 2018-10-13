import * as React from 'react';
import { DropTarget } from 'react-dnd';
import { nodes } from '../../main';
import { SNode } from '../../nodes';

interface NodeViewDropTargetProps {
  node: SNode;
  connectDropTarget?: (x: any) => any;
  isOver?: boolean;
  canDrop?: boolean;
  children?: any;
}

const nodeDropTarget = DropTarget<NodeViewDropTargetProps>('node', {
  canDrop: (props, monitor) => {
    try {
      const sourceNodeId = monitor.getItem()['nodeId'];
      const targetNodeId = props.node.id;
      if (sourceNodeId === targetNodeId) {
        return false;
      }
      const sourceNode = nodes.getNode(sourceNodeId);

      return !sourceNode.hasDescendant(targetNodeId);
    } catch (e) {
      console.error('Error in canDrop:', e);
      return false;
    }
  },
  drop: (props, monitor, component) => {
    if (monitor.isOver({ shallow: true })) {
      return {
        nodeId: props.node.id
      };
    }
  },
}, (connect, monitor) => {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
  };
});

export const NodeViewDropTarget = nodeDropTarget(({
  children,
  connectDropTarget,
  isOver,
  canDrop
}: NodeViewDropTargetProps) => {
  return connectDropTarget(
    <div>
      {children}
    </div>
  );
});
