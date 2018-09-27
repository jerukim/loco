import React from 'react'
import {withGoogleMap, GoogleMap} from 'react-google-maps'

class Map extends React.Component {
  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{lat: 40.756795, lng: -73.954298}}
        defaultZoom={13}
        defaultOptions={{
          disableDefaultUI: true
        }}
      />
    ))
    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{height: `100vh`}} />}
          mapElement={<div style={{height: `100%`}} />}
        />
      </div>
    )
  }
}

export default Map
