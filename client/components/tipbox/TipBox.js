import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import amber from '@material-ui/core/colors/amber'
import CloseIcon from '@material-ui/icons/Close'
import {changeTooltip} from '../../store'

const messages = [
  'Welcome to Loco!',
  'Save addresses to your ADDRESS BOOK to keep track of homes you are looking at and places you will need nearby (e.g. work, school)',
  'Add and sort POINTS OF INTEREST that you would like to access around your next home and view the results in the RESULTS section'
]

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  root: {
    minWidth: '118px',
    maxWidth: '194px',
    marginRight: '28px'
  },
  body: {
    backgroundColor: amber[700]
  }
})

class Tipbox extends React.Component {
  render() {
    const {classes, handleClose, key, open, changeTooltip, index} = this.props
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
            message={messages[index]}
            action={[
              <Button
                key="undo"
                style={{color: 'gray'}}
                size="small"
                onClick={() => {
                  const next = index === 2 ? -1 : index
                  console.log({next})
                  changeTooltip(next + 1)
                }}
              >
                Next
              </Button>,
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

const mapDispatch = dispatch => ({
  changeTooltip: index => dispatch(changeTooltip(index))
})

const mapState = state => ({index: state.tooltips})

export default connect(mapState, mapDispatch)(withStyles(styles)(Tipbox))
