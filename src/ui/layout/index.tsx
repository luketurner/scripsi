import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { observer } from 'mobx-react';

import Navbar from '../navbar';
import NodeView from '../node-view';
import Notifier from '../notifier';
import Sidebar from '../sidebar';
import uiState from '../state';

const styles = require('./layout.css');

type PanelComponent = React.Component<any, any>;

// const connectLayout = connect((state) => ({
//   displayNodeId: state.ui.displayNodeId,
//   isSaving: state.persistence.isSaving
// }))

/**
 * Presentational component that encapsulates the global layout.
 *
 * @class Layout
 * @extends {React.Component<{}, {}>}
 */

export default CSSModule(observer(({ store }) => {
  const closeOpenMenus = e => {
    if (uiState.menus.size > 0) {
      uiState.menus.clear();
      e.preventDefault();
    }
  };
  return (
    <div styleName='container' onClick={closeOpenMenus}>
      <Notifier />
      <div styleName='navbar'>
        <Navbar />
      </div>
      <div styleName='sidebar'>
        <Sidebar store={store} />
      </div>
      <div styleName='content'>
        <NodeView nodeId={store.nodes.viewRootNode} />
      </div>
    </div>
  );
}), styles);
