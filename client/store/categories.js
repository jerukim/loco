import axios from 'axios'

// ACTION TYPES

const FETCH_FILTER_CATEGORIES_REQUEST = 'FETCH_FILTER_CATEGORIES_REQUEST'
const FETCH_FILTER_CATEGORIES_SUCCESS = 'FETCH_FILTER_CATEGORIES_SUCCESS'
const FETCH_FILTER_CATEGORIES_ERROR = 'FETCH_FILTER_CATEGORIES_ERROR'
const FETCH_SELECTED_CATEGORIES_REQUEST = 'FETCH_SELECTED_CATEGORIES_REQUEST'
const FETCH_SELECTED_CATEGORIES_SUCCESS = 'FETCH_SELECTED_CATEGORIES_SUCCESS'
const FETCH_SELECTED_CATEGORIES_ERROR = 'FETCH_SELECTED_CATEGORIES_ERROR'
const ADD_NEW_SELECTED_FILTER = 'ADD_NEW_SELECTED_FILTER'

// ACTION CREATORS

const fetchFilterCategoriesRequest = () => ({
  type: FETCH_FILTER_CATEGORIES_REQUEST
})
const fetchFilterCategoriesSuccess = filterCategories => ({
  type: FETCH_FILTER_CATEGORIES_SUCCESS,
  payload: filterCategories
})
const fetchFilterCategoriesError = () => ({
  type: FETCH_FILTER_CATEGORIES_ERROR
})
const fetchSelectedCategoriesRequest = () => ({
  type: FETCH_SELECTED_CATEGORIES_REQUEST
})
const fetchSelectedCategoriesSuccess = selectedCategories => ({
  type: FETCH_SELECTED_CATEGORIES_SUCCESS,
  payload: selectedCategories
})
const fetchSelectedCategoriesError = () => ({
  type: FETCH_SELECTED_CATEGORIES_ERROR
})

export const addNewwSelectedFilter = category => ({
  type: ADD_NEW_SELECTED_FILTER,
  category
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
    const {data} = await axios.get(`/api/categories/${userId}`)
    dispatch(fetchSelectedCategoriesSuccess(data))
  } catch (error) {
    console.error(error)
    dispatch(fetchSelectedCategoriesError())
  }
}

// INITIAL STATE

const initialState = {
  filterCategoriesErrored: false,
  filterCategoriesFetching: false,
  filterCategories: [],
  selectedCategoriesErrored: false,
  selectedCategoriesFetching: false,
  selectedCategories: []
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_FILTER_CATEGORIES_REQUEST:
      return {...state, filterCategoriesFetching: true}
    case FETCH_FILTER_CATEGORIES_ERROR:
      return {
        ...state,
        filterCategoriesFetching: false,
        filterCategoriesErrored: true
      }
    case FETCH_FILTER_CATEGORIES_SUCCESS:
      return {
        ...state,
        filterCategoriesFetching: false,
        filterCategories: action.payload
      }
    case FETCH_SELECTED_CATEGORIES_REQUEST:
      return {...state, selectedCategoriesFetching: true}
    case FETCH_SELECTED_CATEGORIES_ERROR:
      return {
        ...state,
        selectedCategoriesFetching: false,
        selectedCategoriesErrored: true
      }
    case FETCH_SELECTED_CATEGORIES_SUCCESS:
      return {
        ...state,
        selectedCategoriesFetching: false,
        selectedCategories: action.payload
      }
    case ADD_NEW_SELECTED_FILTER:
    console.log("REDUCER ACTION.CATEGORY", action.category)
      return {
        ...state,
        selectedCategories: [...state.selectedCategories, action.category]
      }
    default:
      return state
  }
}
