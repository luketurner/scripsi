import * as React from 'react';
import { DropTarget } from 'react-dnd';
import { nodes } from '../../main';
import { NodeAncestry, SNode } from '../../nodes';

interface NodeDropTargetProps {
  node: SNode;
  ancestry: NodeAncestry;
  connectDropTarget?: (x: any) => any;
  isOver?: boolean;
  canDrop?: boolean;
  children?: any;
}

const nodeDropTarget = DropTarget<NodeDropTargetProps>('node', {
  canDrop: (props, monitor) => {
    try {
      const sourceNodeId = monitor.getItem()['nodeId'];
      // const sourceAncestry = monitor.getItem()['ancestry'];
      const targetNodeId = props.node.id;
      const targetAncestry = props.ancestry;
      if (targetNodeId === sourceNodeId) return false;
      for (const [id, ix] of targetAncestry) if (sourceNodeId === id) return false;
      return true;
    } catch (e) {
      console.error('Error in canDrop:', e);
      return false;
    }
  },
  drop: (props, monitor, component) => {
    if (monitor.isOver({ shallow: true })) {
      return {
        dropPosition: [props.node.id, Infinity] // TODO -- determine drop index?
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

export const NodeDropTarget = nodeDropTarget(({
  children,
  connectDropTarget,
  isOver,
  canDrop
}: NodeDropTargetProps) => {
  return connectDropTarget(
    <div>
      {children}
    </div>
  );
});
