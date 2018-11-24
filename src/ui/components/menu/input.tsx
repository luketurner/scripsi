import * as React from 'react';
import { state } from '../../';
import { InputHandler, InputResult } from '../input-handler';
import { MenuRow } from './row';

export const MenuInput = ({ onClick, children }) => {
  const handleClick = () => {
    onClick();
    state.openContextMenu = null;
    return InputResult.Handled;
  };
  return (
    <InputHandler onClick={handleClick}>
      <MenuRow>{children}</MenuRow>
    </InputHandler>
  );
};
