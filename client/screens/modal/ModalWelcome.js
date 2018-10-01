import React from 'react'
import {connect} from 'react-redux'
import {Input, Button, Modal} from '@material-ui/core/'

import {Welcome} from '../../components/welcome'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

class ScreensModalWelcome extends React.Component {
  render() {
    if ()
  }
}

const mapState = state => {
  return {
    coordinates: state.coordinates
  }
}

export default connect(mapState)(ScreensModalWelcome)
