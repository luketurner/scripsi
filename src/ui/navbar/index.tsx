import * as React from 'react'

const styles: Dict<string> = require('./navbar.css')

export default () => {
  return <div className={styles['navbar']}>
      <a href="/">scripsi</a>
    </div>
}