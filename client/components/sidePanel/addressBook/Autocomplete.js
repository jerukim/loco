import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import Input from '@material-ui/core/Input'

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
        // inline style for demonstration purpose
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
      const [res] = await geocodeByAddress(address)
      const latLng = await getLatLng(res)
      console.log('Success', latLng)
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

export default Autocomplete
