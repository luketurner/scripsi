import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { SNode, NodeType } from '../../nodes';
import nodeStore from '../../nodes/store';
import Menu, { MenuItem, MenuAnchor } from '../menu';
import uiState from '../state';
import Handle from './handle';

const styles = require('./node-view.css');

export interface NodeViewProps {
  nodeId: string
}

export default CSSModule(observer<NodeViewProps>(({ nodeId }) => {

  let node;

  try {
    node = nodeStore.getNode(nodeId);
  } catch (e) {
    return <div />;
  }

  const NodeTypeComponent = require('../node-types/' + NodeType[node.type].toLowerCase()).default;

  const isOutlined = node.id === uiState.hoveredNode;
  const nodeStyles = ['node', isOutlined ? 'outlined' : ''].join(' ');

  return <div styleName={nodeStyles}>
    <Handle node={node} />
    <NodeTypeComponent node={node} />
  </div>;
}), styles, { allowMultiple: true });