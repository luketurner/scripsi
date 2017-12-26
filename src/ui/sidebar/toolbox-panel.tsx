import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { NodeType } from '../../nodes';
import nodeStore from '../../nodes/store';
import Icon, { IconType } from '../widgets/icon';
import uiState from '../state';
import Tile from '../widgets/tile';
const styles = require('./toolbox-panel.scss');

const NodeTypeButton = CSSModule(({ node, nodeType, icon, title }) => {
  const setNodeType = () => node.setType(nodeType);
  return (
    <div styleName='node-type' key={title}>
      <Tile onClick={setNodeType} iconType={icon}>{title}</Tile>
    </div>
  );
}, styles);

export default CSSModule(observer(props => {
  const focusedNodeId = uiState.focusedNode;
  let focusedNode = null;
  if (focusedNodeId) {
    focusedNode = nodeStore.getNode(focusedNodeId);
  }

  const nodeTypeChooser = (
    <div styleName='node-types'>
      <h2>Node Types</h2>
      <NodeTypeButton node={focusedNode} title='Text' nodeType={NodeType.Text} icon={IconType.IncreaseIndent} />
      <NodeTypeButton node={focusedNode} title='List' nodeType={NodeType.ListItem} icon={IconType.UnorderedList} />
      <NodeTypeButton node={focusedNode} title='Code' nodeType={NodeType.CodeBlock} icon={IconType.Stack} />
    </div>
  );

  return (
    <div styleName='container'>
      <h1>Toolbox</h1>

      {focusedNode && nodeTypeChooser}
    </div>
  );
}), styles);
