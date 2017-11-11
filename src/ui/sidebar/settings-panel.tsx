import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { action } from 'mobx';
import { observer } from 'mobx-react';
import persistenceStore from '../../persistent-storage/store';
import ToggleBackend from './toggle';

const styles = require('./settings-panel.css');

export default CSSModule(observer(({ store }) => {
  const dropboxBackend = persistenceStore.backends.get('dropbox');

  return <div styleName='container'>

    <h1>Settings</h1>

    <div styleName="input-row">
      <label>Database Name</label>
      <input value={store.settings.databaseName}
            onChange={action((e: any) => store.settings.databaseName = e.target.value)} />
    </div>

    <header>
      <h2>Dropbox</h2>
      <div styleName='section-toggle'>
        <ToggleBackend model={dropboxBackend} prop='isEnabled'/>
      </div>
    </header>
      

    <div styleName="input-row">
      <label>Access Token</label>
      <input value={store.settings.dropboxConfig.accessToken}
            onChange={action((e: any) => store.settings.dropboxConfig.accessToken = e.target.value)} />

    </div>
  </div>;
}), styles);