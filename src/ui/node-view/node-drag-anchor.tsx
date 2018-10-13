import * as React from 'react';
import { DragSource } from 'react-dnd';
import { nodes } from '../../main';
import { SNode } from '../../nodes';

@DragSource<{ node: SNode }>('node', {
  beginDrag: (props, monitor, component) => ({
    nodeId: props.node.id,
  }),
  endDrag: (props, monitor, component) => {
    const dropResult = monitor.getDropResult();

    if (!dropResult || !dropResult['nodeId']) {
      return;
    }

    try {
      const targetNode = nodes.getNode(dropResult['nodeId']);
      const sourceNode = nodes.getNode(props.node.id);
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
})
export class NodeDragAnchor extends React.Component<{ node: SNode }, {}> {

  public constructor(props) {
    super(props);
  }

  public render() {
    return this.props['connectDragSource'](
      <div>
        {this.props.children}
      </div>
    );
  }

}
