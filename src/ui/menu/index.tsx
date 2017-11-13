import * as _ from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import uiState from '../state';
import MenuAnchor from './anchor';
import MenuItem from './item';
import SubMenu from './sub-menu';

const styles = require('./menu.css');

export { MenuItem, MenuAnchor, SubMenu };

export interface MenuProps {
  // items: {
  //   label: string
  //   handler: Function
  // }[]
  id: Uuid;
}

export default CSSModule(observer<MenuProps>(({ children, id }) => {
  const closeMenu = e => {
    e.preventDefault();
    uiState.menus.clear();
  };

  const menu = (
    <div styleName='menu' onClick={closeMenu}>
      {children}
    </div>
  );

  if (uiState.menus.get(id)) {
    return menu;
  }

  return null;
}), styles);
