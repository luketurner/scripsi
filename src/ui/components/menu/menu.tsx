import * as React from 'react';
import { InputHandler, InputResult } from '../input-handler';

// swallows clicks so they are not picked up by parent click handlers
// prevents global click handlers from closing menu when the user clicks within it
const alwaysHandled = () => InputResult.Handled;

export const Menu = ({ children }) => {
  return (
    <InputHandler onClick={alwaysHandled} stopClickPropagation={true}>
      <div className='absolute rounded bg-grey-lighter shadow cursor-pointer select-none'>
        { children }
      </div>
    </InputHandler>
  );
};
