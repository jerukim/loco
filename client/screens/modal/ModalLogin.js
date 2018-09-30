import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import {Login} from '../../components'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  }
})

const ModalLogin = props => {
  const {classes, history} = props
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={true}
      onBackdropClick={() => history.push('/home')}
    >
      <div className={classes.paper}>
        <Login />
      </div>
    </Modal>
  )
}

ModalLogin.propTypes = {
  classes: PropTypes.object.isRequired
}

const ScreensModalLogin = withStyles(styles)(ModalLogin)

export default ScreensModalLogin
