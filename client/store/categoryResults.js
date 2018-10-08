import axios from 'axios'
import {fetchAllHomeCategories, fetchOneHomeCategory} from './'

const FETCH_ALL_CATEGORY_RESULTS_SUCCESS = 'GOT_CATEGORY_RESULTS_SUCCESS'
const FETCH_ONE_CATEGORY_RESULTS_SUCCESS = 'FETCH_ONE_CATEGORY_RESULTS_SUCCESS'
const FETCH_CATEGORY_RESULTS_REQUEST = 'FETCH_CATEGORY_RESULTS_REQUEST'
const FETCH_CATEGORY_RESULTS_ERROR = 'FETCH_CATEGORY_RESULTS_ERROR'

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

// adds one category to all the homes
export const fetchOneCategoryResults = (category, homes) => async dispatch => {
  try {
    dispatch(fetchCategoryResultsRequest())
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
    dispatch(fetchOneCategoryResultsSuccess(categoryResults))
  } catch (err) {
    console.error(err)
    dispatch(fetchCategoryResultsError())
  }
}

// adds all the categories to one home

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
    default:
      return state
  }
}
