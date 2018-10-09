import { observer } from 'mobx-react';
import * as React from 'react';
import nodeStore from '../../nodes/store';
import { nodeStorage } from '../../persistent-storage';
// import Icon, { IconType } from '../widgets/icon';

import { AnchorButton, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core';

import PropsPopover from './props-popover';
import SettingsPopover from './settings-popover';

export default observer(() => {

  const isPrimaryUnsaved = nodeStorage.isPrimaryUnsaved();
  const areSecondariesUnsaved = nodeStorage.areSecondaryBackendsUnsaved();

  const onSearchInput = e => nodeStore.setSearchQuery(e.target.value);

  return (
    <Navbar className='pt-focus-disabled'>
      <NavbarGroup>
        <div>
          <NavbarHeading>
            Scripsi
            {isPrimaryUnsaved && <span>*</span>}
            {areSecondariesUnsaved && <span>+</span>}
          </NavbarHeading>
        </div>
        <NavbarDivider />
        <PropsPopover />
        <SettingsPopover />
      </NavbarGroup>
      <NavbarGroup align='right'>
        <div className='pt-input-group'>
          <span className='pt-icon pt-icon-search' />
          <input
            className='pt-input'
            type='search'
            placeholder='Search nodes...'
            dir='auto'
            onChange={onSearchInput}
          />
        </div>
        <NavbarDivider />
        <AnchorButton
          className='pt-minimal'
          icon='git-repo'
          href='https://github.com/luketurner/scripsi'
          target='_blank'
        >
          Github
        </AnchorButton>
      </NavbarGroup>
    </Navbar>
  );

  // return (
  //   <div styleName='navbar'>
  //     <div styleName='brand-section'>
  //       <a href='/'>scripsi</a>
  //       {isPrimaryUnsaved && <span styleName='saving'>*</span>}
  //       {areSecondariesUnsaved && <span styleName='saving'>+</span>}
  //     </div>
  //     <div styleName='search-bar-section'>
  //       <Icon type={IconType.Search} title='search' />
  //       <input styleName='search-bar' placeholder='Search nodes...' onChange={onSearchInput} />
  //     </div>

  //   </div>
  // );
});
