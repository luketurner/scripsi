
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

const styles = require('./item.css');

export default CSSModule(observer(({ label, onClick }) => {
  if (onClick) {
    return <a styleName="item" onClick={onClick} href="">
      {label}
    </a>;
  }
  
  return <div styleName="item">
    {label}
  </div>;
}), styles);