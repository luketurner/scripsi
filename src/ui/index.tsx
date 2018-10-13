import { observer } from 'mobx-react';
import * as React from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Layout from './layout';
import { UIState } from './state';

require('./style.scss');

export const uiState = new UIState();

export default DragDropContext(HTML5Backend)(observer(() =>
  <Layout />
));
