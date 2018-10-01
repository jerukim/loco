import React from 'react'
import {connect} from 'react-redux'
import {Map} from '../../components'
import ScreensWelcomeModal from '../modal/ModalWelcome'
import '../../../secrets'

class ScreensMap extends React.Component {
  render() {
    return (
      <div id="main">
        <ScreensWelcomeModal />
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.GOOGLE_API_KEY
          }&libraries=places`}
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `100vh`}} />}
          mapElement={<div style={{height: `100%`}} />}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    coordinates: state.coordinates
  }
}

export default connect(mapState)(ScreensMap)
