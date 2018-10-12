import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent'
import TipBox from './TipBox'

const styles = themes => ({
  root: {
    backgroundColor: '#f7bd00'
  },
  button: {
    width: '50px',
    height: '50px',
    fontSize: '10px',
    color: 'white',
    padding: 0
  },
  label: {
    display: 'flex',
    flexDirection: 'column'
  }
})

const messages = [
  'Welcome to Loco!',
  'Save addresses to your ADDRESS BOOK to keep track of homes you are looking at and places you will need nearby (e.g. work, school)',
  'Add and sort POINTS OF INTEREST that you would like to access around your next home and view the results in the RESULTS section'
]

class TipButton extends React.Component {
  queue = []

  state = {
    open: true,
    message: messages[0]
  }

  toggleTips = () => {
    this.setState({open: !this.state.open})
  }

  handleClick = index => () => {
    this.setState({message: messages[index]})
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({open: false})
  }

  render() {
    const {classes} = this.props
    return (
      <div className="tips">
        <Button
          classes={{root: classes.root, label: classes.label}}
          className={classes.button}
          onClick={this.toggleTips}
        >
          <div
            style={{
              marginTop: '-5px',
              transform: 'rotate(180deg)'
            }}
          >
            <WbIncandescentIcon />
          </div>
          <p className="show-tips">
            {this.state.open ? 'Hide Tips' : 'Show Tips'}
          </p>
        </Button>
        <TipBox
          handleClick={this.handleClick}
          handleClose={this.handleClose}
          message={this.state.message}
          open={this.state.open}
        />
      </div>
    )
  }
}

export default withStyles(styles)(TipButton)
