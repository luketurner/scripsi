import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { action } from 'mobx';
import { observer } from 'mobx-react';
import persistenceStore from '../../persistent-storage/store';
import settingsStore from '../../settings/store';
import uiState from '../state';
import ToggleBackend from './toggle';
import { Notification } from '../notifier';

const styles = require('./settings-panel.scss');

export default CSSModule(observer(props => {
  const dropboxBackend = persistenceStore.backends.get('dropbox');
  const onDatabaseNameChanged = action((e: any) => settingsStore.settings.databaseName = e.target.value);
  const onAccessTokenChanged = action((e: any) => settingsStore.settings.dropbox.accessToken = e.target.value);

  const startDropboxAuth = () => {
    const notification = (
      <Notification>
        Performing Dropbox authentication will nagivate to a new page.
        <a href='#' onClick={() => dropboxBackend['authenticate']()}>
          Click here to continue...
        </a>
      </Notification>
    );
    uiState.pushNotification(notification, 2000);
  };

  return (
    <div styleName='container'>

      <h1>Settings</h1>

      <div styleName='input-row'>
        <label>Database Name</label>
        <input value={settingsStore.settings.databaseName} onChange={onDatabaseNameChanged} />
      </div>

      <header>
        <h2>Dropbox</h2>
        <div styleName='section-toggle'>
          <ToggleBackend model={dropboxBackend} prop='isEnabled'/>
        </div>
      </header>

      <div styleName='input-row'>
        <label>Access Token</label>
        <input value={settingsStore.settings.dropbox.accessToken} onChange={onAccessTokenChanged} />
      </div>

      <div styleName='input-row'>
        <button onClick={startDropboxAuth}>Authenticate</button>

      </div>
    </div>
  );
}), styles);
