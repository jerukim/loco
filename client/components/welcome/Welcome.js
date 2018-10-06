import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Button, TextField, Select} from '@material-ui/core/'
import {getCoordinates} from '../../store'
import {states} from '../../utilities'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

class Welcome extends React.Component {
  constructor(props) {
    super(props)
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
    const {classes} = this.props
    return (
      <div className="form form-welcome">
        <h1>Welcome to Loco</h1>
        <h3>Make your move</h3>
        <p>Enter the city of your next big move!</p>
        <div className="form-welcome">
          <TextField
            name="city"
            label="City"
            className={classes.textField}
            value={city}
            margin="normal"
            onChange={this.handleChange}
          />
          <Select
            native
            inputProps={{
              name: 'state'
            }}
            label="State"
            // className={classes.textField}
            value={state}
            variant="outlined"
            margin="normal"
            onChange={this.handleChange}
          >
            {states.map((state, i) => (
              <option key={i} value={state}>
                {state}
              </option>
            ))}
          </Select>
        </div>
        <Button variant="contained" onClick={this.handleSubmit}>
          Go
        </Button>
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

export default connect(mapState, mapDispatch)(withStyles(styles)(Welcome))
