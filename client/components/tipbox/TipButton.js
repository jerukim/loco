import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent'
import TipBox from './TipBox'
import {changeTooltip} from '../../store'

const styles = themes => ({
  root: {
    backgroundColor: '#f7bd00',
    borderRadius: '15px'
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

class TipButton extends React.Component {
  state = {
    open: true
  }

  toggleTips = () => {
    this.setState({open: !this.state.open})
  }

  handleClick = index => () => {
    this.setState({open: !this.state.open})
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

const mapDispatch = dispatch => ({
  changeTooltip: index => dispatch(changeTooltip(index))
})

export default connect(null, mapDispatch)(withStyles(styles)(TipButton))
