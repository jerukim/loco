import React from 'react'
import {connect} from 'react-redux'
import {withGoogleMap, GoogleMap, withScriptjs, Marker} from 'react-google-maps'
import {getBounds} from '../../store'

class GMap extends React.Component {
  componentDidUpdate(prevProps) {
    const {homes, places} = this.props
    console.log('Component did update in Google Maps')
    if (homes !== prevProps.homes || places !== prevProps.places) {
      this.props.getBounds([...homes, ...places])
    }
  }
  render() {
    const {places, homes, center, bounds} = this.props

    return (
      <GoogleMap
        center={center}
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
              elementType: 'labels.icon'
            }
          ]
          // clickableIcons: false
        }}
        fitBounds={bounds}
        // panTo={center}
        // setZoom=
      >
        {homes &&
          homes.map(marker => (
            <Marker
              icon={'http://maps.google.com/mapfiles/kml/pal3/icon56.png'}
              position={{lat: marker.location.lat, lng: marker.location.lng}}
              key={marker.id}
            />
          ))}

        {places.map(marker => (
          <Marker
            icon={'http://maps.google.com/mapfiles/kml/pal4/icon47.png'}
            position={{lat: marker.location.lat, lng: marker.location.lng}}
            key={marker.id}
          />
        ))}
      </GoogleMap>
    )
  }
}

const mapState = state => {
  const {coordinates, homes, places, selectedCategories} = state

  return {
    center: coordinates.center,
    homes,
    places,
    selectedCategories
  }
}

const mapDispatch = dispatch => ({
  getBounds: markers => dispatch(getBounds(markers))
})

export default connect(mapState, mapDispatch)(withScriptjs(withGoogleMap(GMap)))
