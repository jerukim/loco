import axios from 'axios'

const GOT_PLACES = 'GOT_PLACES'

const gotPlaces = places => ({type: GOT_PLACES, places})

export const fetchPlaces = userId => async dispatch => {
  try {
    const {data: {places}} = await axios.get(`/api/users/${userId}/places`)
    dispatch(gotPlaces(places))
  } catch (err) {
    console.error(err)
  }
}

export const postPlaces = ({name, address, lat, lng}) => async dispatch => {
  try {
    // POST locations
    const {data: {id: locationId}} = await axios.post('/api/locations', {
      address,
      lat,
      lng
    })
    // POST places
    const {data: {id: placesId}} = await axios.post('/api/places', {
      locationId
    })

    // POST home_places
    await axios.post('/api/users/places', {name, placesId})

    // GET all places
    const {data: {places}} = await axios.get(`/api/homes/places`)
    dispatch(gotPlaces(places))
  } catch (err) {
    console.error('An error occurred while posting a new place')
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PLACES:
      return action.places
    default:
      return state
  }
}
