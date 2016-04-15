import * as React from 'react'
import { registerStyles, createStyler } from '../util/style'

class Sidebar extends React.Component<{}, {}> {
  public render() {
    return <div className={classes['sidebar']}>
      This is the sidebar
    </div>
  }
}

let styler = createStyler()

let classes = registerStyles(styler, {
  sidebar: {
  }
})

export default styler.component(Sidebar)