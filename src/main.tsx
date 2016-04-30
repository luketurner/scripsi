import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { loadState } from './persistence'
import { store } from './store'
import setupDefaultState from './store/setupDefaultState'

import * as _ from 'lodash'

import { NodeType } from './node/types'
import { UIAction } from './ui/types'


import UI from './ui'

require('file?name=[name].[ext]!./index.html')


store.dispatch(loadState())
  .then((action) => {
    if (action.type === 'Persistence.LoadFailed') {
      store.dispatch(setupDefaultState())
    }
  })

render(
  <Provider store={store}>
    <UI />
  </Provider>, 
  document.getElementById('app'))
