import { observer } from 'mobx-react';
import * as React from 'react';

import { Button, Popover, Tab, Tabs } from '@blueprintjs/core';

import { NodeType } from '../../nodes';
import uiState from '../state';

import DropboxSettings from './settings/dropbox';
import GeneralSettings from './settings/general';

export default observer(() => {

  return (
    <Popover position='bottom-left'>
      <Button className='pt-minimal' icon='cog'>Settings</Button>
      <div className='pt-focus-disabled'>
        <Tabs id='settings-panel-tabs'>
          <Tab id='general' title='General' panel={<GeneralSettings />}/>
          <Tab id='dropbox' title='Dropbox' panel={<DropboxSettings />}/>
        </Tabs>
      </div>
    </Popover>
  );
});
