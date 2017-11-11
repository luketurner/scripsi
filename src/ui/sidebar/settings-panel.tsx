import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { action } from 'mobx';
import { observer } from 'mobx-react';
import persistenceStore from '../../persistent-storage/store';
import ToggleBackend from './toggle';

const styles = require('./settings-panel.css');

export default CSSModule(observer(({ store }) => {
  const dropboxBackend = persistenceStore.backends.get('dropbox');

  return <div styleName="container">

    <div>Database Name</div>
    <input value={store.settings.databaseName}
           onChange={action((e: any) => store.settings.databaseName = e.target.value)} />

    <div>Dropbox Token</div>
    <ToggleBackend backend={dropboxBackend}/>
    <input value={store.settings.dropboxConfig.accessToken}
           onChange={action((e: any) => store.settings.dropboxConfig.accessToken = e.target.value)} />

  </div>;
}), styles);