import * as React from 'react';
import { InputHandler, InputResult } from '../input-handler';
import { MenuLabel } from './label';

export const SubMenu = ({ menu, children }) => {
  const [ isOpen, setIsOpen ] = React.useState(false);

  const onMouseEnter = () => setIsOpen(true);
  const onMouseLeave = () => setIsOpen(false);
  const onClick = () => {
    setIsOpen(true);
    return InputResult.Handled;
  };

  return (
    <div>
      <InputHandler onClick={onClick}>
        <div className='hover:bg-grey-light'><MenuLabel>{children}</MenuLabel></div>
      </InputHandler>
      { isOpen && menu }
    </div>
  );
};
