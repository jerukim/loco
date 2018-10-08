import React from 'react'
import {connect} from 'react-redux'
import {withGoogleMap, GoogleMap, withScriptjs, Marker} from 'react-google-maps'
import {getBounds} from '../../store'
import {flattenHomeCategoryResults} from '../../utilities'

class GMap extends React.Component {
  componentDidUpdate = async prevProps => {
    const {userId, homes, places, center, homeId, categoryResults} = this.props
    const homeDeleted = homes.length < prevProps.homes.length
    const placeDeleted = places.length < prevProps.places.length
    const centerChanged = center !== prevProps.center
    let bounds
    try {
      if (!userId) {
        return
      } else if (homeDeleted || placeDeleted) {
        return
      } else if (homes !== prevProps.homes || places !== prevProps.places) {
        bounds = await this.props.getBounds([...homes, ...places])
      } else if (homeId !== prevProps.homeId) {
        const categoryResultsObj = categoryResults[homeId]
        const {lat, lng} = homes.find(home => home.id === homeId).location
        const markers = flattenHomeCategoryResults(categoryResultsObj)
        bounds = await this.props.getBounds(markers, {lat, lng})
      }
      this.refs.map.fitBounds(bounds)
    } catch (err) {
      console.error(
        'An error occurred in Google maps   --- map is working, review bug later'
      )
    }
  }

  render() {
    const {places, homes, center, categoryResults} = this.props
    console.log('****RENDER CATEGORY RESULTS: ', categoryResults)
    // console.log('****NEARBY APT 1: ', categoryResults[1])
    // console.log('****NEARBY APT 1 Supermarkets: ', categoryResults[1][1])
    // console.log('****NEARBY APT 2: ', categoryResults[2])


    // Creates a sigle array of all locations
    let arrOfArr = []

    for (let home in categoryResults) {
      if (categoryResults.hasOwnProperty(home)) {
        for (let category in categoryResults[home]) {
          if (categoryResults[home].hasOwnProperty(category)) {
            for (let i = 0; i < categoryResults[home][category].length; i++) {
              let item = categoryResults[home][category][i]
              arrOfArr.push(item)
            }
          }
        }
      }
    }

    console.log('ARR OF ARR: ', arrOfArr)

    return (
      <GoogleMap
        ref="map"
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

        {arrOfArr &&
          arrOfArr.map(marker => (
            <Marker
              icon={'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'}
              position={{
                lat: marker.geometry.location.lat,
                lng: marker.geometry.location.lng
              }}
              key={marker.id}
            />
          ))}
      </GoogleMap>
    )
  }
}

const mapState = state => {
  console.log('****STATE: ', state)
  const {
    coordinates,
    homes,
    places,
    selectedCategories,
    categoryResults
  } = state

  return {
    userId: state.user.id,
    center: coordinates.center,
    homeId: coordinates.selectedHomeId,
    placeId: coordinates.selectedPlaceId,
    homes,
    places,
    selectedCategories,
    categoryResults
  }
}

const mapDispatch = dispatch => ({
  getBounds: (markers, homeCenter) => dispatch(getBounds(markers, homeCenter))
})

export default connect(mapState, mapDispatch)(withScriptjs(withGoogleMap(GMap)))
