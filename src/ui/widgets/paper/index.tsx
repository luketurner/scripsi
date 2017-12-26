import * as React from 'react';
import * as CSSModule from 'react-css-modules';

const styles = require('./paper.scss');

export default CSSModule(({ isInteractive, children }) => (
  <div styleName={isInteractive ? 'paper-interactive' : 'paper'}>
    {children}
  </div>
), styles);
