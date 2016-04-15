import * as React from 'react'
import { registerStyles, createStyler } from '../util/style'

class Navbar extends React.Component<{}, {}> {
  public render() {
    return <div className={classes['navbar']}>
      <span>config</span>
      <span>index</span>
      <span>home</span>
      <span>addmark</span>
      <span>listmarks</span>
    </div>
  }
}

let styler = createStyler()

let classes = registerStyles(styler, {
  navbar: {
    height: '1.5rem',
    lostCenter: '100% 1rem flex',
    fontFamily: 'Consolas',
    color: '#0004',
    '& span': {
      margin: '0.125rem 1rem',
      cursor: 'pointer',
      '&:hover': {
        color: '#0008'
      }
    },
    '&:hover': {
      color: '#0006'
    }
  }
})

export default styler.component(Navbar)