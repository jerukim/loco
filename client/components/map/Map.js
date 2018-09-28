import React from 'react'
import {connect} from 'react-redux'
import {withGoogleMap, GoogleMap} from 'react-google-maps'

export const Map = withGoogleMap(props => {
  const {lat, lng} = props.coordinates
  // if (lat) return <GoogleMap center={{lat, lng}} />
  return (
    <GoogleMap
      defaultCenter={{lat: 41.8781136, lng: -87.6297982}}
      center={{lat, lng}}
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
})

// Map.setCenter({lat: 39.9568, lng: -86.0134})

const mapState = state => {
  return {
    coordinates: state.coordinates
  }
}

export default connect(mapState)(Map)
