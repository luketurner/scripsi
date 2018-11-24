import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { state } from '../../';
import { uuid } from '../../../util/uuid';
import { InputHandler, InputResult } from '../input-handler';

export interface MenuAnchorProps {
  menu: React.ReactNode;
  children: React.ReactNode;
}

export const MenuAnchor = observer(({ children, menu }: MenuAnchorProps) => {

  const myMenuIdRef = React.useRef(uuid());
  const myMenuId = myMenuIdRef.current;
  const isOpen = state.openContextMenu === myMenuId;

  const toggleMenu = () => {
    state.openContextMenu = state.openContextMenu === myMenuId ? null : myMenuId;
    return InputResult.Handled;
  };

  return (
    <div>
      <InputHandler onContextMenu={toggleMenu}>
        {children}
      </InputHandler>
      { isOpen && menu }
    </div>
  );
});
