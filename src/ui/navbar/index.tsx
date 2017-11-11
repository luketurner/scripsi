import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';
import persistenceStore from '../../persistent-storage/store';

const styles = require('./navbar.css');

export default CSSModule(observer(() => {

  const isPrimaryUnsaved = persistenceStore.isPrimaryUnsaved();
  const areSecondariesUnsaved = persistenceStore.areSecondaryBackendsUnsaved();

  return <div styleName="navbar">
    <a href="/">scripsi</a>{isPrimaryUnsaved && <span styleName="saving">*</span>}{areSecondariesUnsaved && <span styleName="saving">+</span>}
  </div>
}), styles);