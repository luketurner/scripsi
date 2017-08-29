import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { SNode, NodeType } from '../../nodes';
import { UIState } from '../state';

const styles = require('./node-view.css');

export interface NodeViewProps {
  node: SNode
  uiState: UIState
}

export default CSSModule(observer<NodeViewProps>(({ node, uiState }: any) => {

  const NodeTypeComponent = require('../node-types/' + NodeType[node.type].toLowerCase()).default;

  const isOutlined = uiState.hoveredNode === node;
  const nodeStyles = ['node', isOutlined ? 'outlined' : ''].join(' ');

  return <div styleName={nodeStyles}>
    <div styleName='handle'
         onMouseEnter={action('ui.hoverNode', () => uiState.hoveredNode = node)}
         onMouseLeave={action('ui.unhoverNode', () => uiState.hoveredNode = null)}
         onClick={() => node.toggleCollapsed()} />
    <NodeTypeComponent node={node}
                       uiState={uiState} />
  </div>;
}), styles, { allowMultiple: true });