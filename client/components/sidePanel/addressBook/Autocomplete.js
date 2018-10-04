import React from 'react'
import {connect} from 'react-redux'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import {postHome, postPlace} from '../../../store'
import {withScriptjs} from 'react-google-maps'
import {renderFuncSearch} from '../../../utilities'

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {address: ''}
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.setState({address: ''})
    }
  }

  handleChange = address => {
    this.setState({address})
  }

  handleSelect = async address => {
    const {type} = this.props
    const name = type === 'Place' ? address.split(',')[0] : ''
    try {
      console.log('name', name)
      this.setState({address})
      const {userId} = this.props
      const [res] = await geocodeByAddress(address)
      const {lat, lng} = await getLatLng(res)
      await this.props[`post${type}`]({userId, address, lat, lng, name})
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
        {renderFuncSearch(this.props.type)}
      </PlacesAutocomplete>
    )
  }
}

const mapStateToProps = state => ({userId: state.user.id})

const mapDispatchToProps = dispatch => ({
  postHome: payload => dispatch(postHome(payload)),
  postPlace: payload => dispatch(postPlace(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withScriptjs(Autocomplete)
)
