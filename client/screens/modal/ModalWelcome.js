import React from 'react'
import {connect} from 'react-redux'
import {Input, Button, Modal} from '@material-ui/core/'

import {Welcome} from '../../components/welcome'

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
