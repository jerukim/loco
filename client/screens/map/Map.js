import React from 'react'
import {connect} from 'react-redux'
import {Map, Welcome} from '../../components'
import {Modal, withStyles} from '@material-ui/core/'

class ScreensMap extends React.Component {
  render() {
    return (
      <div id="main">
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.GOOGLE_GEO_KEY
          }`}
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
