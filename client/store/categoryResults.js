import axios from 'axios'
import {
  fetchAllHomeCategories,
  fetchOneHomeCategory,
  fetchHomeCategoriesRequest,
  deleteOneHomeCategory,
  fetchAllHomeCategoriesOneHome
} from './'

const FETCH_ALL_CATEGORY_RESULTS_SUCCESS = 'GOT_CATEGORY_RESULTS_SUCCESS'
const FETCH_ONE_CATEGORY_RESULTS_SUCCESS = 'FETCH_ONE_CATEGORY_RESULTS_SUCCESS'
const FETCH_ALL_CATEGORY_RESULTS_ONE_HOME_SUCCESS =
  'FETCH_ALL_CATEGORY_RESULTS_ONE_HOME_SUCCESS'
const FETCH_CATEGORY_RESULTS_REQUEST = 'FETCH_CATEGORY_RESULTS_REQUEST'
const FETCH_CATEGORY_RESULTS_ERROR = 'FETCH_CATEGORY_RESULTS_ERROR'
const DELETED_ONE_CATEGORY_RESULTS = 'DELETED_ONE_CATEGORY_RESULTS'

const fetchAllCategoryResultsSuccess = categoryResults => ({
  type: FETCH_ALL_CATEGORY_RESULTS_SUCCESS,
  categoryResults
})
const fetchOneCategoryResultsSuccess = (categoryResults, categoryId) => ({
  type: FETCH_ONE_CATEGORY_RESULTS_SUCCESS,
  categoryResults,
  categoryId
})
const fetchCategoryResultsRequest = () => ({
  type: FETCH_CATEGORY_RESULTS_REQUEST
})
const fetchCategoryResultsError = () => ({
  type: FETCH_CATEGORY_RESULTS_ERROR
})
const deletedOneCategoryResults = (categoryId, homes) => ({
  type: DELETED_ONE_CATEGORY_RESULTS,
  categoryId,
  homes
})

export const fetchAllCategoryResults = (userId, homes) => async dispatch => {
  try {
    dispatch(fetchCategoryResultsRequest())
    const {data} = await axios.get(`/api/categories/${userId}`)
    const categoryResults = {}

    const categories = data.filter(item => item.categoryId !== null)

    const homePromises = homes.map(async home => {
      const homeInfo = home.location
      const coordinates = {
        lat: homeInfo.lat,
        lng: homeInfo.lng
      }
      categoryResults[home.id] = {}

      const catPromises = categories.map(async category => {
        const {label, categoryId} = category
        const payload = await axios.post(`/api/google/categoryResults`, {
          coordinates,
          category: label
        })
        categoryResults[home.id][categoryId] = payload.data.results
      })

      await Promise.all(catPromises)
    })

    await Promise.all(homePromises)

    dispatch(fetchAllHomeCategories(homes, categoryResults, categories))
    dispatch(fetchAllCategoryResultsSuccess(categoryResults))
  } catch (err) {
    console.error(err)
  }
}

// gets categoryResults for all homes (add category)
export const fetchOneCategoryResults = (category, homes) => async dispatch => {
  try {
    dispatch(fetchCategoryResultsRequest())
    dispatch(fetchHomeCategoriesRequest())
    const {label, categoryId} = category

    const categoryResults = {}

    const homePromises = homes.map(async home => {
      const homeInfo = home.location
      const coordinates = {
        lat: homeInfo.lat,
        lng: homeInfo.lng
      }
      categoryResults[home.id] = {}

      const payload = await axios.post(`/api/google/categoryResults`, {
        coordinates,
        category: label
      })
      categoryResults[home.id][categoryId] = payload.data.results
    })
    await Promise.all(homePromises)

    dispatch(fetchOneHomeCategory(homes, categoryResults, category))
    dispatch(fetchOneCategoryResultsSuccess(categoryResults, categoryId))
  } catch (err) {
    console.error(err)
    dispatch(fetchCategoryResultsError())
  }
}

export const deleteOneCategoryResults = (categoryId, homes) => dispatch => {
  try {
    dispatch(deletedOneCategoryResults(categoryId, homes))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  loaded: false,
  fetchingCategoryResults: false,
  errorFetching: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_CATEGORY_RESULTS_SUCCESS:
      return {
        ...action.categoryResults,
        loaded: true,
        fetchingCategoryResults: false,
        errorFetching: false
      }
    case FETCH_ONE_CATEGORY_RESULTS_SUCCESS:
      const newState = {...state}
      const homeIds = Object.keys(action.categoryResults)
      homeIds.forEach(homeId => {
        newState[homeId][action.categoryId] =
          action.categoryResults[homeId][action.categoryId]
      })
      return {
        ...newState,
        loaded: true,
        fetchingCategoryResults: false,
        errorFetching: false
      }
    case FETCH_CATEGORY_RESULTS_REQUEST:
      return {
        ...state,
        loaded: false,
        fetchingCategoryResults: true,
        errorFetching: false
      }
    case FETCH_CATEGORY_RESULTS_ERROR:
      return {
        ...state,
        loaded: false,
        fetchingCategoryResults: false,
        errorFetching: true
      }
    case DELETED_ONE_CATEGORY_RESULTS:
      const removedState = {...state}
      action.homes.forEach(home => {
        delete removedState[home.id][action.categoryId]
      })
      return removedState
    default:
      return state
  }
}
