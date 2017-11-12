import * as _ from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { Backend } from '../../persistent-storage/backends';
import persistenceStore from '../../persistent-storage/store';

const styles = require('./toggle.css');

export interface ToggleProps {
  model: Object;
  prop: string;
}

export default CSSModule(observer<ToggleProps>(({ model, prop }) => {

  const isOn = !!model[prop];

  const handleClick = action<any>((e) => {
    e.preventDefault();
    model[prop] = !model[prop];
  });
  
  return <button onClick={handleClick} styleName={isOn ? 'on' : 'off'}>
    {isOn ? 'On' : 'Off'} 
  </button>;
}), styles);