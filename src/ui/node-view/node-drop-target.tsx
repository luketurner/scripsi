import * as React from 'react';
import { DropTarget } from 'react-dnd';
import { SNode } from '../../nodes';
import nodeStore from '../../nodes/store';

interface NodeViewDropTargetProps {
  node: SNode;
  connectDropTarget?: (x: any) => any;
  isOver?: boolean;
  canDrop?: boolean;
  children?: any;
}

const nodeDropTarget = DropTarget<NodeViewDropTargetProps>('node', {
  drop: (props, monitor, component) => {
    if (monitor.isOver({ shallow: true })) {
      return {
        nodeId: props.node.id
      };
    }
  },
  canDrop: (props, monitor) => {
    console.log('canDrop');
    try {
      const sourceNodeId = monitor.getItem()['nodeId'];
      const targetNodeId = props.node.id;
      if (sourceNodeId === targetNodeId) {
        return false;
      }
      const sourceNode = nodeStore.getNode(sourceNodeId);

      return !sourceNode.hasDescendant(targetNodeId);
    } catch (e) {
      console.error('Error in canDrop:', e);
      return false;
    }
  }
}, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
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
