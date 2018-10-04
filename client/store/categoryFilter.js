import axios from 'axios'

// ACTION TYPES

const FETCH_FILTER_CATEGORIES_REQUEST = 'FETCH_FILTER_CATEGORIES_REQUEST'
const FETCH_FILTER_CATEGORIES_SUCCESS = 'FETCH_FILTER_CATEGORIES_SUCCESS'
const FETCH_FILTER_CATEGORIES_ERROR = 'FETCH_FILTER_CATEGORIES_ERROR'

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

// INITIAL STATE

const initialState = {
  filterCategoriesErrored: false,
  filterCategoriesFetching: false,
  filterCategories: []
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
    default:
      return state
  }
}
