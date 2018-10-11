import { observer } from 'mobx-react';
import * as React from 'react';
import nodeStore from '../../nodes/store';
import { nodeStorage } from '../../persistent-storage';
// import Icon, { IconType } from '../widgets/icon';

import { AnchorButton, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core';

import PropsPopover from './props-popover';
import SettingsPopover from './settings-popover';
import { Icon, IconType } from '../icon';
import { Button } from '../button';
import uiState from '../state';

export default observer(() => {

  const isPrimaryUnsaved = nodeStorage.isPrimaryUnsaved();
  const areSecondariesUnsaved = nodeStorage.areSecondaryBackendsUnsaved();

  const onSearchInput = e => nodeStore.setSearchQuery(e.target.value);

  const openSettings = e => uiState.toggleSettings();

  return (
    <div className='flex'>
      <div className='p-2'>
        Scripsi
        {isPrimaryUnsaved && <span>*</span>}
        {areSecondariesUnsaved && <span>+</span>}
      </div>
      <div className='flex-1' />
      <div className='p-2'>
        <input
          className='pt-input'
          type='search'
          placeholder='Search nodes...'
          dir='auto'
          onChange={onSearchInput}
        />
      </div>
      <div className='h-8 text-grey'><Button onClick={openSettings}><Icon type={IconType.Cog} /></Button></div>
    </div>
  );
});
