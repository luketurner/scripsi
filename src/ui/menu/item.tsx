
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

const styles = require('./item.css');

// TODO -- don't use `any`
export default CSSModule(observer<any>((props) => {

  if (props.disabled) {
    const stubHandler = e => {
      e.preventDefault();
      e.stopPropagation();
    };
    return <a styleName='disabled item' onClick={stubHandler}>{props.children}</a>;
  }

  const clickHandler = (e) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(e);
    }
  };
  return <a styleName='item' onClick={clickHandler} href="">{props.children}</a>;
}), styles, { allowMultiple: true });