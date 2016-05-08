import * as React from 'react'

import configEditor from '../../config'
import SearchSection from './search'
import ConfigSection from './config'

//const Search = nodeSearcher(SearchSection)
const Config = configEditor(ConfigSection)

export default () => <div>
  <Config />
</div>