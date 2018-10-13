import * as React from 'react';

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
  return (
    <div className='pin absolute bg-grey-lightest'>
      <div className=' h-full flex flex-col container max-w-lg mx-auto'>
        <div>
          <Header />
        </div>

        <div className='flex-1'>
          <Content />
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
