
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import uiState from '../state';

const styles = require('./item.css');

export default CSSModule(observer((props) => {
  const clickHandler = (e) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(e);
    }
  };
  return <a styleName="item" onClick={clickHandler} href="">
    {props.children}
  </a>;
}), styles);