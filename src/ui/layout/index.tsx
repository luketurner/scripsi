import * as React from 'react'
// import { connect } from 'react-redux'
import * as CSSModule from 'react-css-modules'

import { observer } from 'mobx-react';

import Navbar from '../navbar'
import Sidebar from '../sidebar'
import NodeView from '../node-view'
import UIState from '../state';

const styles = require('./layout.css')

type PanelComponent = React.Component<any, any>

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

export default CSSModule(observer(({ uiState, store }) => {
  return <div styleName='container'>
    <div styleName='navbar'>
      <Navbar isUnsaved={store.persistence.isUnsaved} />
    </div>
    <div styleName='sidebar'>
      <Sidebar uiState={uiState} store={store} />
    </div>
    <div styleName='content'>
      <NodeView node={uiState.viewRootNode} uiState={uiState} />
    </div>
  </div>
}), styles)