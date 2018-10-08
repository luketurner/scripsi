import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { NodeType } from '../../nodes';
import nodeStore from '../../nodes/store';
import uiState from '../state';
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

  return (
    <NodeViewDropTarget node={node}>
      <div styleName={isOutlined ? 'node outlined' : 'node'}>
        <NodeViewAnchor node={node} />
        <NodeTypeComponent node={node} />
      </div>
    </NodeViewDropTarget>
  );
}), styles, { allowMultiple: true });
