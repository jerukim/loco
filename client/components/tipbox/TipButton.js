import React from 'react'
import Button from '@material-ui/core/Button'
import Tipbox from './TipBox'

class TipButton extends React.Component {
  queue = []

  state = {
    open: false,
    messageInfo: {}
  }

  handleClick = message => () => {
    this.queue.push({
      message,
      key: new Date().getTime()
    })

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({open: false})
    } else {
      this.processQueue()
    }
  }

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      })
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({open: false})
  }

  handleExited = () => {
    this.processQueue()
  }

  render() {
    return (
      <div className="tips">
        <Button onClick={this.handleClick('message a')}>Show message A</Button>
        <Button onClick={this.handleClick('message b')}>Show message B</Button>
        <Tipbox
          handleClick={this.handleClick}
          handleClose={this.handleClose}
          handleExited={this.handleExited}
        />
      </div>
    )
  }
}

export default TipButton
