import * as React from 'react'
import {connect} from 'react-redux'

import Navbar from './navbar'
import Sidebar from './sidebar'
import NodeView from '../node/view'
import {LayoutStateTree} from './types'

const styles = require('./layout.css')

/**
 * Presentational component that encapsulates the global layout.
 * 
 * @class Layout
 * @extends {React.Component<{}, {}>}
 */
const layout = (props: LayoutStateTree) => {
  return <div className={styles.container}>
    <div className={styles.navbar}>
      <Navbar />
    </div>
    <div className={styles[props.sidebar.left ? 'sidebar' : 'disabled']}>
      <Sidebar />
    </div>
    <div>
      <NodeView nodeId={props.displayNodeId} />
    </div>
    <div className={styles[props.sidebar.right ? 'sidebar' : 'disabled']}>
      <Sidebar />
    </div>
  </div>
}

export default connect((state) => state['layout'])(layout)