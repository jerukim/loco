import React from 'react'
import {connect} from 'react-redux'
import Autocomplete from '../../components/sidePanel/addressBook/Autocomplete'
import List from '../../components/sidePanel/addressBook/List'
import '../../../secrets'

class AddressBook extends React.Component {
  render() {
    return (
      <div className="addressbook-display side-panel-body">
        <Autocomplete
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.GOOGLE_API_KEY
          }&libraries=places`}
          loadingElement={<div style={{height: `100%`}} />}
        />
        {this.props.userId ? (
          <List />
        ) : (
          <div>
            <p>Add addresses</p>
            <small>e.g. apartments, mom's house, pet hospital</small>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({userId: state.user.id})

export default connect(mapStateToProps)(AddressBook)
