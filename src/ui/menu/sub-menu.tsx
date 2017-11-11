
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';
import { v4 as uuidv4 } from 'node-uuid';

import Menu from './index';
import MenuItem from './item';
import uiState from '../state';

const styles = require('./item.css');

export default CSSModule(observer(({ children, label }) => {
  const menuId = uuidv4();
  return <MenuItem onClick={(e) => {
    e.stopPropagation(); // don't close the parent menu when this item is clicked
    const newState = !uiState.menus.get(menuId);
    uiState.menus.set(menuId, newState);
  }}>
    {label}
    <Menu id={menuId}>
      {children}
    </Menu>
  </MenuItem>;
}), styles);