import { observer } from 'mobx-react';
import * as React from 'react';
import { state } from '..';
import { nodes, storageDriver } from '../../main';
import { Button } from '../components/button';
import { Icon, IconType } from '../components/icon';

export const Header = observer(() => {

  const isPrimaryUnsaved = storageDriver.hasUnsavedPrimary;
  const areSecondariesUnsaved = storageDriver.hasUnsavedChanges;

  const onSearchInput = e => nodes.setSearchQuery(e.target.value);

  const openSettings = e => state.toggleSettings();

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
