import axios from 'axios'
// import '../../secrets'

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
  return async dispatch => {
    if (markers[0]) {
      try {
        const bounds = new google.maps.LatLngBounds()
        for (let i = 0; i < markers.length; i++) {
          const {lat, lng} = markers[i].location
          await bounds.extend({lat, lng})
        }
        const {b, f} = bounds
        const center = bounds.getCenter()
        dispatch(gotBounds([b, f]))
        // console.log('center', center)
        dispatch(gotCenter(center))
        return bounds
      } catch (err) {
        console.error('An error occurred while adjusting bounds')
      }
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
