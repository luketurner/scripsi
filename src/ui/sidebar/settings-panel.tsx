import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { action } from 'mobx';
import { observer } from 'mobx-react';
import store from '../../store';
import uiState from '../state';
import ToggleBackend from './toggle';
import { Notification } from '../notifier';
import { nodeStorage } from '../../persistent-storage';

const styles = require('./settings-panel.scss');

export default CSSModule(observer(props => {

  const settings = store.settings.settings;
  const dropboxBackend = nodeStorage.getBackend('dropbox');
  
  const onDatabaseNameChanged = action((e: any) => settings.backends.databaseName = e.target.value);
  const onAccessTokenChanged = action((e: any) => settings.backends.dropbox.accessToken = e.target.value);

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
        <input value={settings.backends.databaseName} onChange={onDatabaseNameChanged} />
      </div>

      <header>
        <h2>Dropbox</h2>
        <div styleName='section-toggle'>
          <button onClick={() => settings.backends.primary = (settings.backends.primary === 'local' ? 'dropbox' : 'local')}>Toggle</button>
        </div>
      </header>

      <div styleName='input-row'>
        <label>Access Token</label>
        <input value={settings.backends.dropbox.accessToken} onChange={onAccessTokenChanged} />
      </div>

      <div styleName='input-row'>
        <button onClick={startDropboxAuth}>Authenticate</button>

      </div>
    </div>
  );
}), styles);
