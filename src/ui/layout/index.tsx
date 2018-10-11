import * as React from 'react';

import { observer } from 'mobx-react';

import nodeStore from '../../nodes/store';
import Navbar from '../navbar';
import NodeView from '../node-view';
import uiState, { ContentView } from '../state';
import { SettingsView } from '../settings';

/**
 * Presentational component that encapsulates the global layout.
 *
 * @class Layout
 * @extends {React.Component<{}, {}>}
 */
export default observer(({ store }) => {
  return (
    <div className='pin absolute bg-grey-lightest'>
      <div className=' h-full flex flex-col container max-w-lg mx-auto'>
        <Navbar />
        <div className='flex-1'>
          {(uiState.content === ContentView.Settings && <SettingsView />)
           || <NodeView nodeId={nodeStore.viewRootNode} />}
        </div>
        <div className='h-8 flex justify-center items-center'>
          Copyright 2018 Luke Turner <span>-</span> <a href='https://github.com/luketurner/scripsi'>github</a>
        </div>
      </div>
    </div>
  );
});
