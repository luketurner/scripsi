import {connect} from 'react-redux'
import {DragDropContext} from 'react-dnd'

import Layout from './layout'

const provideDragDrop = DragDropContext(require('react-dnd-html5-backend'))
const connectUIState = connect((state) => state.ui)

export default provideDragDrop(connectUIState((Layout)))