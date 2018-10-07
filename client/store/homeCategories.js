import axios from 'axios'

const FETCH_HOME_CATEGORIES_REQUEST = 'FETCH_HOME_CATEGORIES_REQUEST'
const FETCH_HOME_CATEGORIES_SUCCESS = 'FETCH_HOME_CATEGORIES_SUCCESS'
const FETCH_HOME_CATEGORIES_ERROR = 'FETCH_HOME_CATEGORIES_ERROR'

const fetchHomeCategoriesRequest = () => ({
  type: FETCH_HOME_CATEGORIES_REQUEST
})
const fetchHomeCategoriesSuccess = homeCategories => ({
  type: FETCH_HOME_CATEGORIES_SUCCESS,
  homeCategories
})
const fetchHomeCategoriesError = () => ({
  type: FETCH_HOME_CATEGORIES_ERROR
})

export const fetchHomeCategories = (
  homes,
  categories,
  catIds
) => async dispatch => {
  try {
    dispatch(fetchHomeCategoriesRequest())
    const modes = ['driving', 'walking', 'bicycling', 'transit']
    const homeCategories = {}

    const homePromises = homes.map(async home => {
      homeCategories[home.id] = {}
      const start = {
        lat: home.location.lat,
        lng: home.location.lng
      }
      const catPromises = catIds.map(async item => {
        const end = {
          lat: categories[home.id][item.categoryId][0].geometry.location.lat,
          lng: categories[home.id][item.categoryId][0].geometry.location.lng
        }
        const walkDataGoogle = await axios.post(
          '/api/google/categoryDistances',
          {
            start,
            end,
            mode: 'walking'
          }
        )
        const transitDataGoogle = await axios.post(
          '/api/google/categoryDistances',
          {
            start,
            end,
            mode: 'transit'
          }
        )
        const bicyclingDataGoogle = await axios.post(
          '/api/google/categoryDistances',
          {
            start,
            end,
            mode: 'bicycling'
          }
        )
        const drivingDataGoogle = await axios.post(
          '/api/google/categoryDistances',
          {
            start,
            end,
            mode: 'driving'
          }
        )

        const infoPromises = Promise.all([
          walkDataGoogle,
          transitDataGoogle,
          bicyclingDataGoogle,
          drivingDataGoogle
        ])
        await infoPromises

        const walkData = walkDataGoogle.data.rows[0].elements[0]
        const transitData = transitDataGoogle.data.rows[0].elements[0]
        const bicyclingData = bicyclingDataGoogle.data.rows[0].elements[0]
        const drivingData = drivingDataGoogle.data.rows[0].elements[0]

        homeCategories[home.id][item.categoryId] = {
          distanceText: walkData.distance.text,
          distanceValue: walkData.distance.value,
          walkingText: walkData.duration.text,
          walkingValue: walkData.duration.value,
          transitText: transitData.duration.text,
          transitValue: transitData.duration.value,
          bicyclingText: bicyclingData.duration.text,
          bicyclingValue: bicyclingData.duration.value,
          drivingText: drivingData.duration.text,
          drivingValue: drivingData.duration.value
        }

        /*
        const modePromises = modes.map(async mode => {
          const data = {}
          const googleData = await axios.post('/api/google/categoryDistances', {
            start,
            end,
            mode
          })
          const {distance, duration} = googleData.data.rows[0].elements[0]
          data.distanceText = distance.text
          data.distanceValue = distance.value
          data[`${mode}Text`] = duration.text
          data[`${mode}Value`] = duration.value
          homeCategories[home.id][item.categoryId] = data
        })
        await Promise.all(modePromises)
        */
      })
      await Promise.all(catPromises)
    })
    await Promise.all(homePromises)

    dispatch(fetchHomeCategoriesSuccess(homeCategories))
  } catch (err) {
    console.error(err)
    dispatch(fetchHomeCategoriesError())
  }
}

const initialState = {
  loaded: false,
  fetchingHomeCategories: false,
  errorFetching: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_HOME_CATEGORIES_REQUEST:
      return {
        ...state,
        loaded: false,
        fetchingHomeCategories: true
      }
    case FETCH_HOME_CATEGORIES_SUCCESS:
      return {
        ...action.homeCategories,
        loaded: true,
        fetchingHomeCategories: false,
        errorFetching: false
      }
    case FETCH_HOME_CATEGORIES_ERROR:
      return {
        ...state,
        loaded: false,
        fetchingHomeCategories: false,
        errorFetching: true
      }
    default:
      return state
  }
}
