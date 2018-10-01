import React from 'react'
import {connect} from 'react-redux'
import Autocomplete from './Autocomplete'
import HomesList from './HomesList'
import '../../../../secrets'

class AddressBook extends React.Component {
  render() {
    return (
      <div>
        <Autocomplete
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.GOOGLE_API_KEY
          }&libraries=places`}
          loadingElement={<div style={{height: `100%`}} />}
        />
        <HomesList />
      </div>
    )
  }
}

const mapStateToProps = state => ({homes: state.homes})

export default connect(mapStateToProps)(AddressBook)
