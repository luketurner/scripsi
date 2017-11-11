import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { action } from 'mobx';
import { observer } from 'mobx-react';

const styles = require('./settings-panel.css');

export default CSSModule(observer(({ store }) => 
  <div styleName="container">
    <div>Database Name</div>
    <input value={store.settings.databaseName}
           onChange={action(v => store.settings.databaseName = v)} />
  </div>
), styles);