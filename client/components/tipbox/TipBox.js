import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
})

class Tipbox extends React.Component {
  render() {
    const {classes, handleClose, handleExited} = this.props
    const {message, key} = this.state.messageInfo
    return (
      <div>
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={handleClose}
          onExited={handleExited}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={handleClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

Tipbox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Tipbox)
