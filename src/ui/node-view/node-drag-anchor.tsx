import * as React from 'react';
import { DragSource } from 'react-dnd';
import { SNode } from '../../nodes';
import nodeStore from '../../nodes/store';

@DragSource<{ node: SNode }>('node', {
  beginDrag: (props, monitor, component) => ({
    nodeId: props.node.id,
    x: console.log('begin drag', props.node.id)
  }),
  endDrag: (props, monitor, component) => {
    const dropResult = monitor.getDropResult();

    if (!dropResult || !dropResult['nodeId']) {
      return;
    }

    try {
      const targetNode = nodeStore.getNode(dropResult['nodeId']);
      const sourceNode = nodeStore.getNode(props.node.id);
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
