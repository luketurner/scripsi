import * as React from 'react';
import { DropTarget } from 'react-dnd';
import { NodeContext } from '.';
import { SNode } from '../../nodes';
import classNames = require('classnames');

interface NodeSeparatorProps {
  node: SNode;
  context: NodeContext;
  insertBefore?: boolean;
}

interface NodeSeparatorDndProps {
  connectDropTarget?: (x: any) => any;
  isOver?: boolean;
  canDrop?: boolean;
  children?: React.ReactNode;
  isDragging?: boolean;
}

const separatorDropTarget = DropTarget<NodeSeparatorProps>('node', {
  canDrop: (props, monitor) => {
    try {
      const draggingNodeId = monitor.getItem()['nodeId'];
      const droppingAncestry = props.context.ancestry;
      if (props.context.ancestry.length === 0) return false; // this is the root-level node, cannot add siblings to it.
      for (const [id, ix] of droppingAncestry) if (draggingNodeId === id) return false;
      return true;
    } catch (e) {
      console.error('Error in canDrop:', e);
      return false;
    }
  },
  drop: (props, monitor, component) => {
    if (monitor.isOver({ shallow: true })) {
      const offset = props.insertBefore ? 0 : 1;
      const [ parentNode, priorIndex ] = props.context.ancestry[props.context.ancestry.length - 1];
      return {
        dropPosition: [ parentNode, priorIndex + offset ]
      };
    }
  },
}, (connect, monitor) => {
  return {
    isDragging: monitor.getItemType() === 'node',
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
  };
});


export const NodeSeparator = separatorDropTarget(({
  isDragging,
  connectDropTarget,
  isOver,
  canDrop
}: NodeSeparatorProps & NodeSeparatorDndProps) => {
  return connectDropTarget(
    <div className={classNames('h-2 p-1', isOver && canDrop && ['bg-grey-light'])}>
      <div className={classNames('h-px', isDragging && 'bg-grey-light', isOver && canDrop && ['bg-grey-light'])} />
    </div>
  );
});
