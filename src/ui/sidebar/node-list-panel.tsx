import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import nodeStore from '../../nodes/store';

const styles = require('./node-list-panel.scss');

export default CSSModule(props =>
  <div styleName='container' />,
  styles
);
