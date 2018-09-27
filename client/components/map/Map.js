import React from 'react'
import {withGoogleMap, GoogleMap} from 'react-google-maps'

const Map = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={{lat: 40.756795, lng: -73.954298}}
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
))

export default Map
