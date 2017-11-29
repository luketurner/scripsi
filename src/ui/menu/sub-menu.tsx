
import { observer } from 'mobx-react';
import { v4 as uuidv4 } from 'node-uuid';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import uiState from '../state';
import Menu from './index';
import MenuItem from './item';

const styles = require('./item.scss');

export default CSSModule(observer(({ children, label }) => {
  const menuId = uuidv4();

  const onClick = e => {
    e.stopPropagation(); // don't close the parent menu when this item is clicked
    const newState = !uiState.menus.get(menuId);
    uiState.menus.set(menuId, newState);
  };

  return (
    <MenuItem onClick={onClick}>
      {label}
      <Menu id={menuId}>
        {children}
      </Menu>
    </MenuItem>
  );
}), styles);
