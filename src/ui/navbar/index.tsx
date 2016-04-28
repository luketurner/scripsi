import * as React from 'react'

const styles: Dict<string> = require('./navbar.css')

export default (props: { isSaving: boolean }) => {
  return <div className={styles['navbar']}>
      <a href="/">scripsi</a>{props.isSaving && <span className={styles['saving']}>*</span>}
    </div>
}