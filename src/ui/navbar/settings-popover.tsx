import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { Button, Tabs2, Tab2 } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/labs';

import { NodeType } from '../../nodes';
import uiState from '../state';

import DropboxSettings from './settings/dropbox';
import GeneralSettings from './settings/general';

const styles = require('./props-popover.scss');

export default CSSModule(observer(() => {

  return (
    <Popover2 placement='bottom-start'>
      <Button className='pt-minimal' iconName='cog'>Settings</Button>
      <div styleName='properties' className='pt-focus-disabled'>
        <Tabs2 id='settings-panel-tabs'>
          <Tab2 id='general' title='General' panel={<GeneralSettings />}/>
          <Tab2 id='dropbox' title='Dropbox' panel={<DropboxSettings />}/>
        </Tabs2>
      </div>
    </Popover2>
  );
}), styles);
