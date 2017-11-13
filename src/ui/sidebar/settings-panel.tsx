import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { action } from 'mobx';
import { observer } from 'mobx-react';
import persistenceStore from '../../persistent-storage/store';
import settingsStore from '../../settings/store';
import ToggleBackend from './toggle';

const styles = require('./settings-panel.css');

export default CSSModule(observer(props => {
  const dropboxBackend = persistenceStore.backends.get('dropbox');
  const onDatabaseNameChanged = action((e: any) => settingsStore.databaseName = e.target.value);
  const onAccessTokenChanged = action((e: any) => settingsStore.dropboxConfig.accessToken = e.target.value);

  return (
    <div styleName='container'>

      <h1>Settings</h1>

      <div styleName='input-row'>
        <label>Database Name</label>
        <input value={settingsStore.databaseName} onChange={onDatabaseNameChanged} />
      </div>

      <header>
        <h2>Dropbox</h2>
        <div styleName='section-toggle'>
          <ToggleBackend model={dropboxBackend} prop='isEnabled'/>
        </div>
      </header>

      <div styleName='input-row'>
        <label>Access Token</label>
        <input value={settingsStore.dropboxConfig.accessToken} onChange={onAccessTokenChanged} />
      </div>
    </div>
  );
}), styles);
