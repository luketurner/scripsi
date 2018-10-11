import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Button, Dialog, FormGroup, InputGroup, Intent, NonIdealState } from '@blueprintjs/core';

import { nodeStorage } from '../../persistent-storage';
import settings from '../../settings/store';
import uiState from '../state';

export const DropboxSettingsView = observer(() => {
  const dropboxBackend = nodeStorage.getBackend('dropbox');
  const authenticate = action((e: any) => dropboxBackend['authenticate']());

  if (!settings.settings.backends.dropbox.accessToken) {
    return (
      <div>
        <p>
          Scripsi can connect to your Dropbox account as a "database".
          Because Scripsi does not persist your data to any centralized datastore by default,
          enabling Dropbox storage is highly recommended to avoid data loss.
        </p>
        <p>
          Click the Activate button below to be redirected to Dropbox.com, where you can
          grant Scripsi limited access to your Dropbox account. (Scripsi will only be able
          to access files in the Scripsi subfolder.) Once you login, you will be redirected
          back to this page.
        </p>
        <Button onClick={authenticate}>Activate</Button>
      </div>
    );
  }

  return (
    <div>
      <FormGroup inline={true} label='Access Token'>
        <InputGroup
          value={settings.settings.backends.dropbox.accessToken}
          readOnly={true}
          rightElement={<Button className='pt-minimal' icon='refresh' onClick={authenticate} />}
        />
      </FormGroup>
    </div>
  );
});
