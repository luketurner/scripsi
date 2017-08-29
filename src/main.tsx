import * as _ from 'lodash';
import * as React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';

import store from './store';
import UI from './ui/index';

// Copies index.html to the output directory
require('file-loader?name=[name].[ext]!./index.html');

render(
  <div>
    <UI store={store} />
    <DevTools />
  </div>,
  document.getElementById('app')
);