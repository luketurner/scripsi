import * as React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'

import {create as createStyler} from 'react-free-style'
import {processRule, registerStyles} from '../util/style'

interface LayoutProps {
  sidebar?: string
}

/**
 * Presentational component that encapsulates the global layout.
 * 
 * @class Layout
 * @extends {React.Component<{}, {}>}
 */
class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return <div className={classes['container']}>
      <div className={classes['navbar']}>
        <Navbar />
      </div>
      <div className={classes[this.props.sidebar ? 'sidebar' : 'disabled']}>
        <Sidebar />
      </div>
      <div className='content'>
        Content
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
    lostColumn: '3/4'
  },
  disabled: {
    display: 'none'
  }
})

// TODO - disable this layout debugging style
styler.registerRule('body :hover', processRule({
  backgroundColor: 'rgba(0, 0, 255, 0.1)'
}))

export default styler.component(Layout)