import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import Icon, { IconType } from '../icon';
import { SNode, NodeType } from '../../nodes';
import nodeStore from '../../nodes/store';
import Menu, { MenuItem, SubMenu, MenuAnchor } from '../menu';
import { UIState } from '../state';

const styles = require('./handle.css');

export default CSSModule(observer(({ node, uiState }) => 
  <MenuAnchor id={node.id}>

    <div styleName='handle' 
      onMouseEnter={action('ui.hoverNode', () => uiState.hoveredNode = node.id)}
      onMouseLeave={action('ui.unhoverNode', () => uiState.hoveredNode = null)}
      onClick={() => node.toggleCollapsed()} />

    <Menu id={node.id}>

      <MenuItem onClick={() => node.promote()}>
        <Icon type={IconType.DecreaseIndent} /> promote
      </MenuItem>

      <MenuItem onClick={() => node.demote()}>
        <Icon type={IconType.IncreaseIndent} /> demote      
      </MenuItem>

      <SubMenu label={<div>Node Types</div>}>
        <MenuItem>test</MenuItem>
        <MenuItem>test2</MenuItem>
      </SubMenu>

    </Menu>

  </MenuAnchor>
), styles);