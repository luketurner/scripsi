import * as React from 'react';
import { DropTarget } from 'react-dnd';
import { SNode } from '../../nodes';
import nodeStore from '../../nodes/store';
import * as CSSModule from 'react-css-modules';

const styles = require('./node-drop-target.scss');

interface NodeViewDropTargetProps {
  node: SNode;
  connectDropTarget?: (x: any) => any;
  hasDraggingOver?: boolean;
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

export const NodeViewDropTarget = nodeDropTarget(CSSModule(({ children, connectDropTarget, isOver, canDrop }) => {
  return connectDropTarget(
    <div styleName={ isOver ? canDrop ? 'droppable' : 'not-droppable' : ''}>
      {children}
    </div>
  );
}, styles) as React.StatelessComponent<NodeViewDropTargetProps>);
