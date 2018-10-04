import axios from 'axios'

const GOT_HOME_PLACES = 'GOT_HOME_PLACES'

export const gotHomePlaces = homePlaces => ({type: GOT_HOME_PLACES, homePlaces})

export const fetchHomePlaces = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/home_places`)
    let homePlaces = {}
    data.forEach(homePlace => {
      homePlaces[homePlace.homeId] = {}
    })
    data.forEach(homePlace => {
      homePlaces[homePlace.homeId][homePlace.placeId] = homePlace
    })
    dispatch(gotHomePlaces(homePlaces))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_HOME_PLACES:
      return action.homePlaces
    default:
      return state
  }
}
