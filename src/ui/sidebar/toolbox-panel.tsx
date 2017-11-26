import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { NodeType } from '../../nodes';
import nodeStore from '../../nodes/store';
import Icon, { IconType } from '../icon';
import uiState from '../state';

const styles = require('./toolbox-panel.css');

const NodeTypeButton = CSSModule(({ node, nodeType, icon, title }) => {
  const setNodeType = () => node.setType(nodeType);
  return (
    <div styleName='node-type' key={title} onClick={setNodeType}>
      <Icon type={icon} title={title} />
      {title}
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
      <NodeTypeButton node={focusedNode} title='UL' nodeType={NodeType.ListItem} icon={IconType.UnorderedList} />
      <NodeTypeButton node={focusedNode} title='Code' nodeType={NodeType.CodeBlock} icon={IconType.UnorderedList} />
    </div>
  );

  return (
    <div styleName='container'>
      <h1>Toolbox</h1>

      {focusedNode && nodeTypeChooser}
    </div>
  );
}), styles);
