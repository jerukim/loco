import axios from 'axios'
import '../../secrets'

const GOT_CENTER = 'GET_CENTER'
const GOT_BOUNDS = 'GOT_BOUNDS'

const gotCenter = payload => ({
  type: GOT_CENTER,
  center: payload
})

const gotBounds = payload => ({
  type: GOT_BOUNDS,
  bounds: payload
})

export const getCenter = (city, state) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=,+${city},+${state}&key=${
          process.env.GOOGLE_API_KEY
        }`
      )
      const {lat, lng} = data.results[0].geometry.location
      dispatch(gotCenter({lat, lng}))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getBounds = markers => {
  return dispatch => {
    if (markers[0]) {
      const bounds = new google.maps.LatLngBounds()
      // console.log('Bounds', bounds)
      markers.forEach(marker => {
        const {lat, lng} = marker.location
        bounds.extend({lat, lng})
      })
      // console.log('Bounds after mapping markers', bounds)
      const center = bounds.getCenter()
      // console.log('New calculated center', center)
      dispatch(gotBounds(bounds))
      dispatch(gotCenter(center))
    }
  }
}

const initialState = {center: {}, bounds: []}

const coordinatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CENTER:
      return {...state, center: action.center}
    case GOT_BOUNDS:
      return {...state, bounds: action.bounds}
    default:
      return state
  }
}

export default coordinatesReducer
