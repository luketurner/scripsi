import * as React from 'react';

import { state } from '..';
import { InputHandler, InputResult } from '../components/input-handler';
import { Content } from './content';
import { Footer } from './footer';
import { Header } from './header';

/**
 * Presentational component that encapsulates the global layout.
 *
 * @class Layout
 * @extends {React.Component<{}, {}>}
 */
export const Layout = () => {
  const clearModalState = () => {
    if (state.openContextMenu) {
      state.openContextMenu = null;
      return InputResult.Handled;
    }
    return InputResult.NotHandled;
  };
  return (
    <InputHandler onClick={clearModalState}>
      <div className='pin absolute bg-grey-lightest w-full h-full' onClick={() => state.focusedNode = null}>
        <div className='bg-grey-lightest' onClick={() => state.focusedNode = null}>
          <div className='max-w-lg mx-auto h-8 fixed pin-t pin-x bg-grey-lightest'>
            <Header />
          </div>

          <div className='max-w-lg mx-auto py-8'>
            <Content />
          </div>

          <div className='max-w-lg mx-auto h-8 fixed pin-b pin-x bg-grey-lightest'>
            <Footer />
          </div>
        </div>
      </div>
    </InputHandler>
  );
};
