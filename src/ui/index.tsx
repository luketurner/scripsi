import { observer } from 'mobx-react';
import * as React from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Layout } from './layout';
import { UIState } from './state';

// Include all 3rd party CSS
require('!style-loader!css-loader!normalize.css/normalize.css');
require('!style-loader!css-loader!@blueprintjs/core/lib/css/blueprint.css');
require('!style-loader!css-loader!@blueprintjs/icons/lib/css/blueprint-icons.css');

require('./style.scss');

export const state = new UIState();

export const UI = DragDropContext(HTML5Backend)(observer(() =>
  <Layout />
));
