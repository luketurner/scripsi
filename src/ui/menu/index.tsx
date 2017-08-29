import * as _ from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import MenuItem from './item';

const styles = require('./menu.css');

export interface MenuProps {
  items: { 
    label: string
    handler: Function
  }[]
}

export default CSSModule(observer<MenuProps>(({ items }) =>
  <div styleName='menu'> 
    {_.map(items, (item) => 
      <MenuItem label={item.label}
                onClick={item.handler} />
    )}
  </div>
), styles);