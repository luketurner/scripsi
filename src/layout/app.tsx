import * as React from 'react'
import Layout from './layout'
import {connect} from 'react-redux'
import {StateTree} from '../store/types'

interface AppProps {
  sidebar: string
}

/**
 * Presentational component that encapsulates the whole app.
 * 
 * @class App
 * @extends {React.Component<{}, {}>}
 */
class App extends React.Component<AppProps, {}> {
  public render() {
    return <Layout sidebar={this.props.sidebar} /> 
  }
}

const mapStateToProps = (state: StateTree) => {
  return {
    sidebar: state['activeSidebar']
  }
}

export default connect(mapStateToProps)(App)