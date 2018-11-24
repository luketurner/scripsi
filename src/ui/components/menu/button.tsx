import * as React from 'react';
import { state } from '../../';
import { InputHandler, InputResult } from '../input-handler';
import { MenuLabel } from './label';

export const MenuButton = ({ onClick, children, disabled = false }) => {
  const handleClick = () => {
    onClick();
    state.openContextMenu = null;
    return InputResult.Handled;
  };
  if (disabled) return <div className='text-grey'><MenuLabel>{children}</MenuLabel></div>;
  return (
    <InputHandler onClick={handleClick}>
      <div className='hover:bg-grey-light'><MenuLabel>{children}</MenuLabel></div>
    </InputHandler>
  );
};
