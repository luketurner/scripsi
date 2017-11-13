import { observer } from 'mobx-react';
import * as React from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { GlobalStore } from '../store';
import Layout from './layout';

export interface UIProps {
  store: GlobalStore;
}

export default DragDropContext(HTML5Backend)(observer<UIProps>(({ store }) =>
  <Layout store={store} />
));
