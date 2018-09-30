import axios from 'axios'
import {getStreetViewUrl} from '../../server/services'

const GOT_HOMES = 'GOT_HOMES'

const gotHomes = homes => ({type: GOT_HOMES, homes})

export const fetchHomes = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/homes`)
    const homes = data.homes
    dispatch(gotHomes(homes))
  } catch (err) {
    console.error(err)
  }
}

export const postHome = ({userId, address, lat, lng}) => async dispatch => {
  try {
    // POST locations
    const {data: {id: locationId}} = await axios.post('/api/locations', {
      address,
      lat,
      lng
    })
    // POST homes
    const imgUrl = await getStreetViewUrl(lat, lng, 400, 400)
    const {data: {id: homeId}} = await axios.post('/api/homes', {
      imgUrl,
      locationId
    })

    // POST user_homes
    await axios.post('/api/users/homes', {userId, homeId})

    // GET all user homes
    const {data} = await axios.get(`/api/users/${userId}/homes`)
    const homes = data.homes
    dispatch(gotHomes(homes))
  } catch (err) {
    console.error('An error occurred while posting a new home')
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_HOMES:
      return action.homes
    default:
      return state
  }
}
