import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { Button, FormGroup, InputGroup, NonIdealState, Intent, Dialog } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/labs';

import { nodeStorage } from '../../../persistent-storage';
import settings from '../../../settings/store';
import uiState from '../../state';

const styles = require('./dropbox.scss');

export default CSSModule(observer(() => {
  const dropboxBackend = nodeStorage.getBackend('dropbox');
  const refreshAccessToken = action((e: any) => dropboxBackend['authenticate']());
  const closeRefreshDialog = action(() => uiState.openDialog = null)
  const showRefreshDialog = action(() => {
    uiState.openDialog = (
      <Dialog isOpen={true} onClose={closeRefreshDialog} title='Dropbox User Authentication'>
        <div className="pt-dialog-body">
          You will be redirected to Dropbox's website to login and grant Scripsi limited access to your Dropbox account.
          Once you login, you will be redirected back to this page.
        </div>

        <div className="pt-dialog-footer">
          Do you want to continue?
          <div className="pt-dialog-footer-actions">
            <Button text="Cancel" onClick={closeRefreshDialog} />
            <Button text="OK" onClick={refreshAccessToken} intent={Intent.PRIMARY} />
          </div>
        </div>
      </Dialog>
    );
  });

  if (!settings.settings.backends.dropbox.accessToken) {
    return (
      <NonIdealState
        visual='warning-sign'
        title='Not enabled'
        description='Dropbox storage is not configured. To enable it, you will need to perform Dropbox OAuth login.'
        action={<Button text='Enable' intent={Intent.PRIMARY} onClick={showRefreshDialog}/>}
      />
    );
  }

  return (
    <div>
      <FormGroup inline={true} label='Access Token'>
        <InputGroup
          value={settings.settings.backends.dropbox.accessToken}
          readOnly={true}
          rightElement={<Button className='pt-minimal' iconName='refresh' onClick={showRefreshDialog} />}
        />
      </FormGroup>
    </div>
  );
}), styles);
