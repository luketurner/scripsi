import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { NodeType, SNode } from '../../nodes';
import nodeStore from '../../nodes/store';
import Icon, { IconType } from '../icon';
import Menu, { MenuAnchor, MenuItem, SubMenu } from '../menu';
import uiState from '../state';

const styles = require('./handle.css');

export default CSSModule(observer(({ node }) =>
  <MenuAnchor id={node.id}>

    <div styleName='handle'
      onMouseEnter={action('ui.hoverNode', () => uiState.hoveredNode = node.id)}
      onMouseLeave={action('ui.unhoverNode', () => uiState.hoveredNode = null)}
      onClick={() => node.toggleCollapsed()} />

    <Menu id={node.id}>

      <MenuItem onClick={() => node.promote()}>
        Promote
      </MenuItem>

      <MenuItem onClick={() => node.demote()}>
        Demote
      </MenuItem>

      <SubMenu label={<div>Node Types</div>}>
        <MenuItem disabled={node.type === NodeType.Text} onClick={() => node.setType(NodeType.Text)}>Plain Text</MenuItem>
        <MenuItem disabled={node.type === NodeType.ListItem} onClick={() => node.setType(NodeType.ListItem)}>List</MenuItem>
      </SubMenu>

    </Menu>

  </MenuAnchor>
), styles);
