import React from 'react'
import {connect} from 'react-redux'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import {postHome, fetchHomes} from '../../../store'
import {withScriptjs} from 'react-google-maps'
import {renderFuncSearch} from '../../../utilities'

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {address: ''}
  }

  handleChange = address => {
    this.setState({address})
  }

  handleSelect = async address => {
    try {
      this.setState({address})
      const {userId} = this.props
      const [res] = await geocodeByAddress(address)
      const {lat, lng} = await getLatLng(res)
      await this.props.postHome({userId, address, lat, lng})
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {renderFuncSearch}
      </PlacesAutocomplete>
    )
  }
}

const mapStateToProps = state => ({userId: state.user.id})

const mapDispatchToProps = dispatch => ({
  postHome: payload => dispatch(postHome(payload)),
  fetchHomes: userId => dispatch(fetchHomes(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withScriptjs(Autocomplete)
)
