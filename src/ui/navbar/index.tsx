import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';
import nodeStore from '../../nodes/store';
import persistenceStore from '../../persistent-storage/store';
import Icon, { IconType } from '../shared/icon';

const styles = require('./navbar.scss');

export default CSSModule(observer(() => {

  const isPrimaryUnsaved = persistenceStore.isPrimaryUnsaved();
  const areSecondariesUnsaved = persistenceStore.areSecondaryBackendsUnsaved();

  const onSearchInput = e => nodeStore.setSearchQuery(e.target.value);

  return (
    <div styleName='navbar'>
      <div styleName='brand-section'>
        <a href='/'>scripsi</a>
        {isPrimaryUnsaved && <span styleName='saving'>*</span>}
        {areSecondariesUnsaved && <span styleName='saving'>+</span>}
      </div>
      <div styleName='search-bar-section'>
        <Icon type={IconType.Search} title='search' />
        <input styleName='search-bar' placeholder='Search nodes...' onChange={onSearchInput} />
      </div>

    </div>
  );
}), styles);
