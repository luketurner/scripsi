import * as React from 'react'
import {connect} from 'react-redux'
import {map} from 'lodash'

import {SNode} from '../../node/types'

const styles: Dict<string> = require('./search.css')

interface SidebarProps {
  searchQuery: string
  searchResults: SNode[]
  onQueryChange: { (newQuery: string): void }
}

export default (props: SidebarProps) => {
  const updateQuery = (e) => props.onQueryChange(e.target.value)
  const setQuery = (v) => () => props.onQueryChange(v)
  return <div className={styles['sidebar']}>
    <div>
      <input className={styles['searchbar']} type="text" placeholder="Search" value={props.searchQuery} onChange={updateQuery} />
    </div>
    <div className={styles['shortcuts']}>
      <div onClick={setQuery('name:*')}>all</div>
      <div onClick={setQuery('#mark')}>marked</div>
      <div onClick={setQuery('parent:""')}>orphaned</div>
    </div>
    {map(props.searchResults, (result) =>
      <div>{result.id}</div>
    )}
  </div>
}
