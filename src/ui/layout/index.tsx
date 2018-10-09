import * as React from 'react';

import { observer } from 'mobx-react';

import nodeStore from '../../nodes/store';
import Navbar from '../navbar';
import NodeView from '../node-view';
import uiState from '../state';

/**
 * Presentational component that encapsulates the global layout.
 *
 * @class Layout
 * @extends {React.Component<{}, {}>}
 */
export default observer(({ store }) => {
  return (
    <div>
      <Navbar />
      <div>
        <NodeView nodeId={nodeStore.viewRootNode} />
      </div>
    </div>
  );
});
