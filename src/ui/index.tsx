import {connect} from 'react-redux'
import {DragDropContext} from 'react-dnd'

import Layout from './layout'

const provideDragDrop = DragDropContext(require('react-dnd-html5-backend'))
const connectUIState = connect((state) => state.ui, (dispatch) => ({
  toggleLeftSidebar: () => dispatch({
    type: 'UI.ToggleLeftSidebar'
  })
}))

export default provideDragDrop(connectUIState((Layout)))