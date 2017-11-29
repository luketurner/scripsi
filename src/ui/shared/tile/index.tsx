import * as React from 'react';
import * as CSSModule from 'react-css-modules';
import Icon, { IconType } from '../icon';

const styles = require('./tile.css');

export default CSSModule(({ children, iconType, title }) => {

  const maybeIcon = iconType ? (
    <div styleName='icon'>
      <Icon type={iconType} title={title} />
    </div>
  ) : null;

  const contentStyle = iconType ? 'icon-content' : 'content';

  return (
    <div styleName='tile'>
      {maybeIcon}
      <div styleName={contentStyle}>
        {children}
      </div>
    </div>
  );
}, styles);
