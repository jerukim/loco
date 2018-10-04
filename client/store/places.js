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

export const postPlace = ({
  userId,
  homeId,
  name,
  address,
  lat,
  lng
}) => async dispatch => {
  try {
    // POST locations
    const {data: {id: locationId}} = await axios.post('/api/locations', {
      address,
      lat,
      lng
    })

    // POST places
    const {data: {id: placeId}} = await axios.post('/api/places', {
      name,
      locationId
    })

    // POST user_places
    await axios.post('/api/users/places', {userId, placeId})

    // POST home_places
    await axios.post('/api/homes/places', {homeId, placeId})

    // need query for user's homes and map the homeIds to create rows in home_place table

    // GET all places
    const {data: {places}} = await axios.get(`/api/users/${userId}/places`)
    dispatch(gotPlaces(places))
  } catch (err) {
    console.error('An error occurred while posting a new place')
  }
}

export const putPlace = ({
  userId,
  placeId,
  address,
  name,
  lat,
  lng
}) => async dispatch => {
  let placePayload

  try {
    if (address) {
      const {data: {id: locationId}} = await axios.post('/api/locations', {
        address,
        lat,
        lng
      })
      placePayload = {locationId, name}
    } else {
      placePayload = {name}
    }

    await axios.put(`/api/places/${placeId}`, placePayload)

    // GET all places
    const {data: {places}} = await axios.get(`/api/users/${userId}/places`)
    dispatch(gotPlaces(places))
  } catch (err) {
    console.error('An error occured while updating places')
  }
}

export const deletePlace = ({userId, placeId}) => async dispatch => {
  try {
    await axios.delete(`/api/places/${placeId}`)

    // GET all places
    const {data: {places}} = await axios.get(`/api/users/${userId}/places`)
    dispatch(gotPlaces(places))
  } catch (err) {
    console.log('An error occurred while deleting places')
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
