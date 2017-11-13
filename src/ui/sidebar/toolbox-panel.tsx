import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import Icon, { IconType } from '../icon';
import nodeStore from '../../nodes/store';
import uiState from '../state';
import { NodeType } from '../../nodes';

const styles = require('./toolbox-panel.css');

const NodeTypeButton = CSSModule(({ node, nodeType, icon, title }) => {
  return <div styleName='node-type' key={title} onClick={() => node.setType(nodeType)}>
    <Icon type={icon} title={title} />
    {title}
  </div>
}, styles);

export default CSSModule(observer((props) => {
  const focusedNodeId = uiState.focusedNode;
  let focusedNode = null;
  if (focusedNodeId) {
    focusedNode = nodeStore.getNode(focusedNodeId);
  }
  return <div styleName='container'>
    <h1>Toolbox</h1>

    {focusedNode && <div styleName='node-types'>
      <h2>Node Types</h2>
      <NodeTypeButton node={focusedNode} title="Text" nodeType={NodeType.Text} icon={IconType.IncreaseIndent} />
      <NodeTypeButton node={focusedNode} title="UL" nodeType={NodeType.ListItem} icon={IconType.UnorderedList} />
    </div>}
  </div>;
}), styles);