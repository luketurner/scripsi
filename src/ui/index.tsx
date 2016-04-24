import {connect} from 'react-redux'

import Layout from './layout'

export default connect((state) => state.ui)(Layout)