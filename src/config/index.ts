import {connect} from 'react-redux'
import {resetState} from '../persistence'

const mapStateToProps = (state) => ({
  persistType: state.persistence.persistType,
  databaseName: state.persistence.databaseName
})

const mapDispatchToProps = (dispatch) => ({
  onChangeDatabaseName: (newName) => dispatch({
    type: 'Persistence.SetDatabaseName',
    databaseName: newName
  }),
  onChangePersistType: (persistType) => dispatch({
    type: 'Persistence.SetPersistType',
    persistType: persistType
  })
  //resetState: () => dispatch(resetState())
})

export default connect(mapStateToProps, mapDispatchToProps)