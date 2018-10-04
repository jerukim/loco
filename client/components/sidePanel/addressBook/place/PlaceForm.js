import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'

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
      name: this.props.name
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

  render() {
    const {classes} = this.props
    const {address, price, link} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Address"
          className={classes.textField}
          value={address}
          InputProps={{className: classes.input}}
          onChange={this.handleChange('address')}
        />
        <TextField
          label="Price"
          value={price}
          className={classes.textField}
          InputProps={{
            className: classes.input,
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          onChange={this.handleChange('price')}
        />
        <TextField
          label="Link"
          value={link}
          className={classes.textField}
          InputProps={{className: classes.input}}
          onChange={this.handleChange('link')}
        />
        <Button type="submit">Save</Button>
      </form>
    )
  }
}

export default withStyles(styles)(PlaceForm)
