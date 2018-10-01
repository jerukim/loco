import React from 'react'
import {connect} from 'react-redux'
import {Input, Button} from '@material-ui/core/'

import {getCoordinates} from '../../store'

class Welcome extends React.Component {
  constructor() {
    super()
    this.state = {
      city: '',
      state: ''
    }
  }

  handleChange = e => {
    const {name, value} = e.target
    e.preventDefault()
    this.setState({[name]: value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const {city, state} = this.state
    this.props.getCoordinates(city, state)
  }

  render() {
    const {city, state} = this.state
    return (
      <div>
        <h1>Welcome, select your start location to begin:</h1>
        <form>
          <Input
            name="city"
            placeholder="City"
            value={city}
            onChange={this.handleChange}
          />
          <Input
            name="state"
            placeholder="State"
            value={state}
            onChange={this.handleChange}
          />
          <Button variant="contained" onClick={this.handleSubmit}>
            Go
          </Button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    coordinates: state.coordinates
  }
}

const mapDispatch = dispatch => {
  return {
    getCoordinates: (city, state) => dispatch(getCoordinates(city, state))
  }
}

export default connect(mapState, mapDispatch)(Welcome)
