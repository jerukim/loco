import React from 'react'
import {connect} from 'react-redux'
import Autocomplete from './Autocomplete'
import HomesList from './HomesList'

class AddressBook extends React.Component {
  render() {
    return (
      <div>
        <Autocomplete />
        <HomesList />
      </div>
    )
  }
}

const mapStateToProps = state => ({homes: state.homes})

export default connect(mapStateToProps)(AddressBook)
