import axios from 'axios'

// ACTION TYPES

const FETCH_FILTER_CATEGORIES_REQUEST = 'FETCH_FILTER_CATEGORIES_REQUEST'
const FETCH_FILTER_CATEGORIES_SUCCESS = 'FETCH_FILTER_CATEGORIES_SUCCESS'
const FETCH_FILTER_CATEGORIES_ERROR = 'FETCH_FILTER_CATEGORIES_ERROR'
const FETCH_SELECTED_CATEGORIES_REQUEST = 'FETCH_SELECTED_CATEGORIES_REQUEST'
const FETCH_SELECTED_CATEGORIES_SUCCESS = 'FETCH_SELECTED_CATEGORIES_SUCCESS'
const FETCH_SELECTED_CATEGORIES_ERROR = 'FETCH_SELECTED_CATEGORIES_ERROR'

// ACTION CREATORS

const fetchFilterCategoriesRequest = () => ({
  type: FETCH_FILTER_CATEGORIES_REQUEST
})
const fetchFilterCategoriesSuccess = filterItems => ({
  type: FETCH_FILTER_CATEGORIES_SUCCESS,
  payload: filterItems
})
const fetchFilterCategoriesError = () => ({
  type: FETCH_FILTER_CATEGORIES_ERROR
})
const fetchSelectedCategoriesRequest = () => ({
  type: FETCH_SELECTED_CATEGORIES_REQUEST
})
const fetchSelectedCategoriesSuccess = selectedItems => ({
  type: FETCH_SELECTED_CATEGORIES_SUCCESS,
  payload: selectedItems
})
const fetchSelectedCategoriesError = () => ({
  type: FETCH_SELECTED_CATEGORIES_ERROR
})

// THUNK CREATORS

export const fetchFilterCategories = () => async dispatch => {
  try {
    dispatch(fetchFilterCategoriesRequest())
    const {data} = await axios.get('/api/categories')
    dispatch(fetchFilterCategoriesSuccess(data))
  } catch (error) {
    console.error(error)
    dispatch(fetchFilterCategoriesError())
  }
}

export const fetchSelectedCategories = userId => async dispatch => {
  try {
    dispatch(fetchSelectedCategoriesRequest())
    const {data} = await axios.get(`/api/users/${userId}/categories`)
    dispatch(fetchSelectedCategoriesSuccess(data))
  } catch (error) {
    console.error(error)
    dispatch(fetchSelectedCategoriesError())
  }
}

// INITIAL STATE

const initialState = {
  filterErrored: false,
  filterFetching: false,
  filterItems: [],
  selectedErrored: false,
  selectedFetching: false,
  selectedItems: []
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_FILTER_CATEGORIES_REQUEST:
      return {...state, filterFetching: true}
    case FETCH_FILTER_CATEGORIES_ERROR:
      return {...state, filterFetching: false, filterErrored: true}
    case FETCH_FILTER_CATEGORIES_SUCCESS:
      return {...state, filterFetching: false, filterItems: action.payload}
    case FETCH_SELECTED_CATEGORIES_REQUEST:
      return {...state, selectedFetching: true}
    case FETCH_SELECTED_CATEGORIES_ERROR:
      return {...state, selectedFetching: false, selectedErrored: true}
    case FETCH_SELECTED_CATEGORIES_SUCCESS:
      return {...state, selectedFetching: false, filterItems: action.payload}
    default:
      return state
  }
}
