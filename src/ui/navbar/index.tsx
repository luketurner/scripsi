import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

const styles = require('./navbar.css');

export default CSSModule(observer<{ isUnsaved: boolean }>(({ isUnsaved }) => 
  <div styleName="navbar">
    <a href="/">scripsi</a>{isUnsaved && <span styleName="saving">*</span>}
  </div>
), styles);