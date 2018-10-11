import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import {renderFuncEdit} from '../../../../utilities'
import {putPlace} from '../../../../store'

const styles = theme => ({
  textField: {
    width: '100%',
    marginBottom: '25px'
  },
  input: {
    fontSize: '14px'
  }
})

class PlaceForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.place.location.address,
      name: this.props.place.name,
      lat: 0,
      lng: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(prop) {
    return event => {
      this.setState({[prop]: event.target.value})
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const {userId} = this.props
    const {id: placeId} = this.props.place
    let payload = {userId, placeId}
    if (this.state.lat === 0 && this.state.lng === 0) {
      const {name} = this.state
      payload = {...payload, name}
    } else {
      payload = {...payload, ...this.state}
    }
    this.props.putPlace(payload)
  }

  handleAutoChange = address => {
    this.setState({address})
  }

  handleAutoSelect = async address => {
    try {
      const [res] = await geocodeByAddress(address)
      const {lat, lng} = await getLatLng(res)
      this.setState({address, lat, lng})
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {classes} = this.props
    const {name, address} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        {/* <PlacesAutocomplete
          value={address}
          onChange={this.handleAutoChange}
          onSelect={this.handleAutoSelect}
        >
          {renderFuncEdit}
        </PlacesAutocomplete> */}
        <TextField
          label="Label"
          className={classes.textField}
          value={name}
          InputProps={{className: classes.input}}
          onChange={this.handleChange('name')}
        />
        <PlacesAutocomplete
          value={address}
          onChange={this.handleAutoChange}
          onSelect={this.handleAutoSelect}
        >
          {renderFuncEdit}
        </PlacesAutocomplete>
        <div className="flex-container flex-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({userId: state.user.id})

const mapDispatchToProps = dispatch => ({
  putPlace: payload => dispatch(putPlace(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PlaceForm)
)
