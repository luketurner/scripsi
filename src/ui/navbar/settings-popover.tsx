import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { Button, Popover, Tab, Tabs } from '@blueprintjs/core';

import { NodeType } from '../../nodes';
import uiState from '../state';

import DropboxSettings from './settings/dropbox';
import GeneralSettings from './settings/general';

const styles = require('./props-popover.scss');

export default CSSModule(observer(() => {

  return (
    <Popover position='bottom-left'>
      <Button className='pt-minimal' icon='cog'>Settings</Button>
      <div styleName='properties' className='pt-focus-disabled'>
        <Tabs id='settings-panel-tabs'>
          <Tab id='general' title='General' panel={<GeneralSettings />}/>
          <Tab id='dropbox' title='Dropbox' panel={<DropboxSettings />}/>
        </Tabs>
      </div>
    </Popover>
  );
}), styles);
