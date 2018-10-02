import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  textField: {
    width: '100%'
  }
})

class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.home.location.address,
      price: this.props.home.price || 0,
      link: ''
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
          onChange={this.handleChange('address')}
        />
        <TextField
          label="Price"
          value={price}
          className={classes.textField}
          onChange={this.handleChange('price')}
        />
        <TextField
          label="Link"
          value={link}
          onChange={this.handleChange('link')}
          className={classes.textField}
        />
        <Button type="submit">Save</Button>
      </form>
    )
  }
}

export default withStyles(styles)(AddressForm)
