import React from 'react'
import {connect} from 'react-redux'
import {withGoogleMap, GoogleMap, withScriptjs} from 'react-google-maps'

class GMap extends React.Component {
  render() {
    const {lat, lng} = this.props.coordinates
    return (
      <GoogleMap
        center={new google.maps.LatLng(lat, lng)}
        defaultZoom={13}
        defaultOptions={{
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{visibility: 'off'}]
            }
          ]
          // clickableIcons: false
        }}
      />
    )
  }
}

const mapState = state => {
  return {
    coordinates: state.coordinates
  }
}

export default connect(mapState)(withScriptjs(withGoogleMap(GMap)))
