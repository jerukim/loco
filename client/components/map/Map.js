import React from 'react'
import {connect} from 'react-redux'
import {withGoogleMap, GoogleMap, withScriptjs, Marker} from 'react-google-maps'
import {getBounds} from '../../store'

class GMap extends React.Component {
  componentDidUpdate = async prevProps => {
    const {homes, places} = this.props
    if (!homes[0] && !places[0]) {
      console.log('home and places do not exist')
      return
    } else if (homes !== prevProps.homes || places !== prevProps.places) {
      try {
        const bounds = await this.props.getBounds([...homes, ...places])
        this.refs.map.fitBounds(bounds)
        this.refs.map.zoom(13)
      } catch (err) {
        console.error('An error occurred in Google maps')
      }
    }
  }

  render() {
    const {places, homes, center, bounds} = this.props

    return (
      <GoogleMap
        ref="map"
        center={center}
        defaultZoom={13}
        fitBounds={bounds}
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
