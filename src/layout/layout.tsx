import * as React from 'react'
import {connect} from 'react-redux'
import {create as createStyler} from 'react-free-style'
import {get, partialRight} from 'lodash'

import {processRule, registerStyles} from '../util/style'
import Navbar from './navbar'
import Sidebar from './sidebar'
import NodeView from '../node/view'
import {LayoutStateTree} from './types'

/**
 * Presentational component that encapsulates the global layout.
 * 
 * @class Layout
 * @extends {React.Component<{}, {}>}
 */
class Layout extends React.Component<LayoutStateTree, {}> {
  public render() {
    return <div className={classes['container']}>
      <div className={classes['navbar']}>
        <Navbar />
      </div>
      <div className={classes[this.props.sidebar.left ? 'sidebar' : 'disabled']}>
        <Sidebar />
      </div>
      <div className='content'>
        <NodeView nodeId={this.props.displayNodeId} />
      </div>
      <div className={classes[this.props.sidebar.right ? 'sidebar' : 'disabled']}>
        <Sidebar />
      </div>
      <styler.Element />
    </div>
  }
}

let styler = createStyler()

let classes = registerStyles(styler, {
  container: {
    '@lost flexbox': 'flex',
    height: '100%',
    lostCenter: '720px 20px flex'
  },
  navbar: {
    width: '100%'
  },
  sidebar: {
    lostColumn: '1/4'
  },
  content: {
  },
  disabled: {
    display: 'none'
  }
})

// TODO - disable this layout debugging style
styler.registerRule('body :hover', processRule({
  backgroundColor: 'rgba(0, 0, 255, 0.1)'
}))

export default connect((state) => state['layout'])(styler.component(Layout))