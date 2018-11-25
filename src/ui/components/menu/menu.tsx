import * as React from 'react';
import { InputHandler, InputResult } from '../input-handler';
import { Overlay } from '../overlay';
import { state } from '../..';

// swallows clicks so they are not picked up by parent click handlers
// prevents global click handlers from closing menu when the user clicks within it
const alwaysHandled = () => InputResult.Handled;

export const Menu = ({ children }) => {
  const clearMenu = () => {
    if (state.openContextMenu) {
      state.openContextMenu = null;
      return InputResult.Handled;
    }
    return InputResult.NotHandled;
  };
  return (
    <InputHandler>
      <Overlay onClick={clearMenu} />
      <InputHandler onClick={alwaysHandled} stopClickPropagation={true}>
        <div className='absolute rounded bg-grey-lighter shadow cursor-pointer select-none'>
          { children }
        </div>
      </InputHandler>
    </InputHandler>

  );
};
