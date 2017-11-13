import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import uiState from '../state';

export interface MenuAnchorProps {
  id: Uuid;
}

export default observer<MenuAnchorProps>(({ children, id }) => {

  const openNodeMenu = action('ui.openNodeMenu', (e: any) => {
    e.preventDefault();
    const newState = !uiState.menus.get(id);
    uiState.menus.clear();
    uiState.menus.set(id, newState);
  });

  return (
    <div onContextMenu={openNodeMenu}>
      {children}
    </div>
  );
});
