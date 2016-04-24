import * as React from 'react'
import {connect} from 'react-redux'

import Navbar from '../ui/navbar'
import {SearchSidebar} from '../ui/sidebar'
import NodeView from '../node'
import {LayoutState} from './types'

const styles = require('./layout.css')

/**
 * Presentational component that encapsulates the global layout.
 * 
 * @class Layout
 * @extends {React.Component<{}, {}>}
 */
const layout = (props: LayoutState) => {
  return <div className={styles.container}>
    <div className={styles.navbar}>
      <Navbar />
    </div>
    <div className={styles['sidebar']}>
      <SearchSidebar />
    </div>
    <div className={styles['content']}>
      <NodeView nodeId={props.displayNodeId} />
    </div>
  </div>
}

export default connect((state) => state['layout'])(layout)