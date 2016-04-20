import * as React from 'react'

const styles: Dict<string> = require('./navbar.css')

export default () => {
  return <div className={styles['navbar']}>
      <span>index</span>
      <span>home</span>
      <span>addmark</span>
      <span>listmarks</span>
      <span>config</span>
    </div>
}