import axios from 'axios'

// ACTION TYPES

const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR'

// ACTION CREATORS

const fetchCategoriesRequest = () => ({type: FETCH_CATEGORIES_REQUEST})
const fetchCategoriesSuccess = items => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: items
})
const fetchCategoriesError = () => ({type: FETCH_CATEGORIES_ERROR})

// THUNK CREATORS

export const fetchCategories = () => async dispatch => {
  try {
    dispatch(fetchCategoriesRequest())
    const {data} = await axios.get('/api/categories')
    dispatch(fetchCategoriesSuccess(data))
  } catch (error) {
    console.error(error)
    dispatch(fetchCategoriesError())
  }
}

// INITIAL STATE

const initialState = {
  errored: false,
  fetching: false,
  items: []
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {...state, fetching: true}
    case FETCH_CATEGORIES_ERROR:
      return {...state, fetching: false, errored: true}
    case FETCH_CATEGORIES_SUCCESS:
      return {...state, fetching: false, items: action.payload}
    default:
      return state
  }
}
