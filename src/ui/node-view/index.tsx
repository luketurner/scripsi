import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { NodeType } from '../../nodes';
import uiState from '../state';
import nodeStore from '../../nodes/store';
import { NodeViewAnchor } from './anchor';
import { NodeViewDropTarget } from './node-drop-target';

const styles = require('./node-view.scss');

export interface NodeViewProps {
  nodeId: string;
}

export default CSSModule(observer(props => {

  let node;

  try {
    node = nodeStore.getNode(props.nodeId);
  } catch (e) {
    return <div />;
  }

  const NodeTypeComponent = require('../node-types/' + NodeType[node.type].toLowerCase()).default;

  const isOutlined = node.id === uiState.hoveredNode;
  const nodeStyles = ['node', isOutlined ? 'outlined' : ''].join(' ');

  return (
    <NodeViewDropTarget node={node}>
      <div styleName={nodeStyles}>
        <NodeViewAnchor node={node} />
        <NodeTypeComponent node={node} />
      </div>
    </NodeViewDropTarget>
  );
}), styles, { allowMultiple: true });
