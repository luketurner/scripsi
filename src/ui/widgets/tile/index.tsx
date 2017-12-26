import * as React from 'react';
import * as CSSModule from 'react-css-modules';
import Icon, { IconType } from '../icon';
import Paper from '../paper';
import TileBase from './base';

const styles = require('./tile.scss');

const defaultHandler = () => true;

export default CSSModule(({ children, iconType, title, onClick = defaultHandler }) => {

  const maybeIcon = iconType ? (
    <div styleName='icon'>
      <Icon type={iconType} title={title} />
    </div>
  ) : null;

  const contentStyle = iconType ? 'icon-content' : 'content';

  return (
    <Paper isInteractive={!!onClick}>
      <TileBase iconType={iconType} title={title} onClick={onClick}>
        {children}
      </TileBase>
    </Paper>
  );
}, styles);
