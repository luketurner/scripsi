import * as React from 'react';
import * as CSSModule from 'react-css-modules';
import Icon, { IconType } from '../icon';
import Paper from '../paper';

const styles = require('./tile.scss');

const defaultHandler = () => true;

export default CSSModule(({ children }) => {
  return (
    <Paper>
      {children}
    </Paper>
  );
}, styles);
