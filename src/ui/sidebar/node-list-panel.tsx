import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import nodeStore from '../../nodes/store';

const styles = require('./node-list-panel.css');

export default CSSModule((props) =>
  <div styleName="container">
    <input styleName="search-bar" placeholder="Search nodes..."
           onChange={(e) => nodeStore.setSearchQuery(e.target.value)} />
  </div>,
  styles
);