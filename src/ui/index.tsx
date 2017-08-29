import { observer } from 'mobx-react';
import * as React from 'react';

import Layout from './layout';
import uiState from './state';
import { GlobalStore } from '../store';

export default observer<{ store: GlobalStore }>(({ store }) => 
  <Layout uiState={uiState} store={store} />
);