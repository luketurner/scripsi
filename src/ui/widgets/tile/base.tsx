import * as React from 'react';
import * as CSSModule from 'react-css-modules';
import Icon, { IconType } from '../icon';
import Paper from '../paper';

const styles = require('./base.scss');

const defaultHandler = () => true;

export default CSSModule(({ children, iconType, title, onClick = defaultHandler }) => {

  const maybeIcon = iconType ? (
    <div styleName='icon'>
      <Icon type={iconType} title={title} />
    </div>
  ) : null;

  const contentStyle = iconType ? 'icon-content' : 'content';

  return (
    <div styleName='tile-base' onClick={onClick}>
        {maybeIcon}
        <div styleName={contentStyle}>
          {children}
        </div>
    </div>
  );
}, styles);
