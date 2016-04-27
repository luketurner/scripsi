import * as React from 'react'

import Navbar from '../navbar'
import {SearchSidebar} from '../sidebar'
import NodeView from '../../node'

const styles = require('./layout.css')

export interface LayoutProps {
  displayNodeId: string
  showLeftSidebar: boolean
  toggleLeftSidebar: { (): void }
}

/**
 * Presentational component that encapsulates the global layout.
 * 
 * @class Layout
 * @extends {React.Component<{}, {}>}
 */
export default (props: LayoutProps) => {
  return <div className={styles.container}>
    <div className={styles.navbar}>
      <Navbar />
    </div>
    <div className={styles[props.showLeftSidebar ? 'sidebar' : 'sidebarCollapsed']}>
      <div className={styles['collapser']} onClick={props.toggleLeftSidebar}>{ props.showLeftSidebar ? '<<' : '>>' }</div>
      { props.showLeftSidebar && <SearchSidebar /> }
    </div>
    <div className={styles['content']}>
      <NodeView nodeId={props.displayNodeId} />
    </div>
  </div>
}