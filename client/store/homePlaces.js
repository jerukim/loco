import axios from 'axios'

const FETCH_ALL_HOME_PLACES_SUCCESS = 'FETCH_ALL_HOME_PLACES_SUCCESS'
const FETCH_ONE_HOME_PLACES_SUCCESS = 'FETCH_ONE_HOME_PLACES_SUCCESS'
const FETCH_HOME_PLACES_REQUEST = 'FETCH_HOME_PLACES_REQUEST'
const FETCH_HOME_PLACES_ERROR = 'FETCH_HOME_PLACES_ERROR'

const fetchAllHomePlacesSuccess = homePlaces => ({
  type: FETCH_ALL_HOME_PLACES_SUCCESS,
  homePlaces
})
const fetchOneHomePlacesSuccess = homePlaces => ({
  type: FETCH_ONE_HOME_PLACES_SUCCESS,
  homePlaces
})
const fetchHomePlacesRequest = () => ({
  type: FETCH_HOME_PLACES_REQUEST
})
const fetchHomePlacesError = () => ({
  type: FETCH_HOME_PLACES_ERROR
})

export const fetchAllHomePlaces = userId => async dispatch => {
  try {
    dispatch(fetchHomePlacesRequest())
    const {data} = await axios.get(`/api/users/${userId}/home_places`)
    let homePlaces = {}
    data.forEach(homePlace => {
      homePlaces[homePlace.homeId] = {}
    })
    data.forEach(homePlace => {
      homePlaces[homePlace.homeId][homePlace.placeId] = homePlace
    })
    dispatch(fetchAllHomePlacesSuccess(homePlaces))
  } catch (err) {
    console.error(err)
    dispatch(fetchHomePlacesError())
  }
}

export const fetchOneHomePlaces = (userId, homeId) => async dispatch => {
  try {
    dispatch(fetchHomePlacesRequest())

    // get users places
    const {data: {places}} = await axios.get(`/api/users/${userId}/places`)

    // with new homeId map over places to add to db
    const homePlacePromises = places.map(async place => {
      await axios.post('/api/homes/places', {
        homeId,
        placeId: place.id
      })
    })
    await Promise.all(homePlacePromises)

    // update store with new homePlaces
    dispatch(fetchAllHomePlaces(userId))
  } catch (err) {
    console.error(err)
    dispatch(fetchHomePlacesError())
  }
}

const initialState = {
  loaded: false,
  fetchingCategoryResults: false,
  errorFetching: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_HOME_PLACES_SUCCESS:
      return {
        ...action.homePlaces,
        loaded: true,
        fetchingCategoryResults: false,
        errorFetching: false
      }
    case FETCH_ONE_HOME_PLACES_SUCCESS:
      return {...state}
    case FETCH_HOME_PLACES_REQUEST:
      return {
        ...state,
        loaded: false,
        fetchingCategoryResults: true,
        errorFetching: false
      }
    case FETCH_HOME_PLACES_ERROR:
      return {
        ...state,
        loaded: false,
        fetchingCategoryResults: false,
        errorFetching: true
      }
    default:
      return state
  }
}
