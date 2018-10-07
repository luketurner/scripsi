import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { observer } from 'mobx-react';

import nodeStore from '../../nodes/store';
import Navbar from '../navbar';
import NodeView from '../node-view';
import uiState from '../state';

const styles = require('./layout.scss');

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
  return (
    <div styleName='container'>
      <Navbar />
      <div styleName='content'>
        <NodeView nodeId={nodeStore.viewRootNode} />
      </div>
      {uiState.openDialog}
    </div>
  );
}), styles);
