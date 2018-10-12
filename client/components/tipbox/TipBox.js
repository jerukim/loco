import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import amber from '@material-ui/core/colors/amber'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  root: {
    minWidth: '200px',
    marginRight: '28px'
  },
  body: {
    backgroundColor: amber[700]
  }
})

class Tipbox extends React.Component {
  render() {
    const {classes, handleClose, message, key, open} = this.props
    return (
      <div>
        <Snackbar
          classes={{root: classes.root}}
          key={key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={open}
          autoHideDuration={6000}
        >
          <SnackbarContent
            classes={{root: classes.root}}
            className={classes.body}
            aria-describedby="client-snackbar"
            message={message}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    )
  }
}

Tipbox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Tipbox)
