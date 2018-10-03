import React from 'react'
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
    width: '100%'
  },
  input: {
    fontSize: '14px'
  }
})

class PlaceForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.home.location.address,
      name: this.props.name,
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
    console.log('Submission form:', this.state)
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
        <Button type="submit">Save</Button>
      </form>
    )
  }
}

export default withStyles(styles)(PlaceForm)
