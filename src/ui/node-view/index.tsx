import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';
import { DragSource, DropTarget } from 'react-dnd';

import { NodeType, SNode } from '../../nodes';
import nodeStore from '../../nodes/store';
import Menu, { MenuAnchor, MenuItem } from '../menu';
import uiState from '../state';
import Handle from './handle';

const styles = require('./node-view.css');

export interface NodeViewProps {
  nodeId: string;
}

const nodeDragSource = DragSource<NodeViewProps>('node', {
  beginDrag: (props, monitor, component) => ({
    nodeId: props.nodeId
  }),
  endDrag: (props, monitor, component) => {
    const dropResult = monitor.getDropResult();

    if (!dropResult || !dropResult.nodeId) {
      return;
    }

    try {
      const targetNode = nodeStore.getNode(dropResult.nodeId);
      const sourceNode = nodeStore.getNode(props.nodeId);
      sourceNode.setParent(targetNode);
    } catch (e) {
      console.error('Error finalizing drag operation', e);
      return;
    }
  }
}, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
});

const nodeDropTarget = DropTarget<NodeViewProps>('node', {
  drop: (props, monitor, component) => {
    if (monitor.isOver({ shallow: true })) {
      return {
        nodeId: props.nodeId
      };
    }
  },
  canDrop: (props, monitor) => {
    try {
      const sourceNodeId = monitor.getItem().nodeId;
      const targetNodeId = props.nodeId;
      const sourceNode = nodeStore.getNode(sourceNodeId);

      return sourceNode.hasDescendant(targetNodeId);
    } catch (e) {
      console.error('Error in canDrop:', e);
      return false;
    }
  }
}, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hasDraggingOver: monitor.isOver({ shallow: true })
  };
});

export default nodeDragSource(nodeDropTarget(CSSModule(observer<NodeViewProps>(props => {

  let node;

  try {
    node = nodeStore.getNode(props.nodeId);
  } catch (e) {
    return <div />;
  }

  const NodeTypeComponent = require('../node-types/' + NodeType[node.type].toLowerCase()).default;

  const isOutlined = node.id === uiState.hoveredNode || props.hasDraggingOver;
  const nodeStyles = ['node', isOutlined ? 'outlined' : ''].join(' ');

  return props.connectDragSource(props.connectDropTarget(<div styleName={nodeStyles}>
    <Handle node={node} />
    <NodeTypeComponent node={node} />
  </div>));
}), styles, { allowMultiple: true })));
