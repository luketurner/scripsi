import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { NodeType, SNode } from '../../nodes';
import nodeStore from '../../nodes/store';
import Icon, { IconType } from '../widgets/icon';
import Menu, { MenuAnchor, MenuItem, SubMenu } from '../menu';
import uiState from '../state';

const styles = require('./handle.scss');

export default CSSModule(observer(({ node }) => {

  const hoverNode = action('ui.hoverNode', () => uiState.hoveredNode = node.id);
  const unhoverNode = action('ui.unhoverNode', () => uiState.hoveredNode = null);

  const setNodeType = [
    NodeType.Text,
    NodeType.ListItem
  ].reduce<any>((memo, nodeType) => {
    memo[nodeType] = () => node.setType(NodeType.ListItem);
    return memo;
  }, {});

  return (
    <MenuAnchor id={node.id}>

      <div
        styleName='handle'
        onMouseEnter={hoverNode}
        onMouseLeave={unhoverNode}
        onClick={() => node.toggleCollapsed()}
      />

      <Menu id={node.id}>

        <MenuItem onClick={() => node.promote()}>
          Promote
        </MenuItem>

        <MenuItem onClick={() => node.demote()}>
          Demote
        </MenuItem>

        <SubMenu label={<div>Node Types</div>}>
          <MenuItem disabled={node.type === NodeType.Text} onClick={setNodeType[NodeType.Text]}>Plain Text</MenuItem>
          <MenuItem disabled={node.type === NodeType.ListItem} onClick={setNodeType[NodeType.ListItem]}>List</MenuItem>
        </SubMenu>

      </Menu>

    </MenuAnchor>
  );
}), styles);
