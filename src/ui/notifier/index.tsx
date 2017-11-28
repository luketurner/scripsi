import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { observer } from 'mobx-react';

import uiState from '../state';

export default CSSModule(observer(props => {
  return (
    <div styleName='notifier'>
      {uiState.notifications}
    </div>
  );
}), require('./notifier.css'));
