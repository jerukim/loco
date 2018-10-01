import axios from 'axios'
import '../../secrets'

const GOT_COORDINATES = 'GET_COORDINATES'

const gotCoordinates = (lat, lng) => ({
  type: GOT_COORDINATES,
  lat,
  lng
})

export const getCoordinates = (city, state) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=,+${city},+${state}&key=${
          process.env.GOOGLE_GEO_KEY
        }`
      )
      const {lat, lng} = data.results[0].geometry.location
      dispatch(gotCoordinates(lat, lng))
    } catch (err) {
      console.error(err)
    }
  }
}

const coordinatesReducer = (
  state = {lat: 41.8781136, lng: -87.6297982},
  action
) => {
  switch (action.type) {
    case GOT_COORDINATES:
      return {lat: action.lat, lng: action.lng}
    default:
      return state
  }
}

export default coordinatesReducer
