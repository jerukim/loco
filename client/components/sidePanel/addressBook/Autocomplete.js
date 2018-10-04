import React from 'react'
import {connect} from 'react-redux'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import Input from '@material-ui/core/Input'
import {postHome, fetchHomes} from '../../../store'
import {withScriptjs} from 'react-google-maps'

const renderFunc = ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading
}) => (
  <div>
    <Input
      {...getInputProps({
        placeholder: 'Search Places ...',
        className: 'location-search-input'
      })}
    />

    <div className="autocomplete-dropdown-container">
      {loading && <div>Loading...</div>}
      {suggestions.map((suggestion, i) => {
        const className = suggestion.active
          ? 'suggestion-item--active'
          : 'suggestion-item'
        const style = suggestion.active
          ? {backgroundColor: '#fafafa', cursor: 'pointer'}
          : {backgroundColor: '#ffffff', cursor: 'pointer'}
        return (
          <div
            key={i}
            {...getSuggestionItemProps(suggestion, {
              className,
              style
            })}
          >
            <span>{suggestion.description}</span>
          </div>
        )
      })}
    </div>
  </div>
)

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
        {renderFunc}
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
