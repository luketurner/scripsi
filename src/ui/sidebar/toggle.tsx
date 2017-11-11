import * as _ from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { Backend } from '../../persistent-storage/backends';
import persistenceStore from '../../persistent-storage/store';

export default observer<{ backend: Backend }>(({ backend }) => {

  const handleClick = action<any>((e) => {
    e.preventDefault();
    backend.isEnabled = !backend.isEnabled;
  });
  
  return <button onClick={handleClick}>
    { (backend.isEnabled ? 'Disable' : 'Enable') + ' ' + backend.name } 
  </button>;
});