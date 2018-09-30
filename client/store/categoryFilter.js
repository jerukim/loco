import axios from 'axios'

// ACTION TYPES

const FETCH_CATEGORY_REQUEST = 'FETCH_CATEGORY_REQUEST'
const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS'
const FETCH_CATEGORY_ERROR = 'FETCH_CATEGORY_ERROR'

// ACTION CREATOR

const fetchCategoryRequest = () => ({type: FETCH_CATEGORY_REQUEST})
const fetchCategorySuccess = items => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: items
})
const fetchCategoryError = () => ({type: FETCH_CATEGORY_ERROR})

// THUNK CREATOR

export const fetchCategories = () => async dispatch => {
  try {
    dispatch(fetchCategoryRequest())
    const {data} = await axios.get('/api/categories')
    console.log('DATA: ', data)
    dispatch(fetchCategorySuccess(data))
  } catch (error) {
    console.error(error)
    dispatch(fetchCategoryError())
  }
}

// INITIAL STATE

const initialState = {
  errored: false,
  fetching: false,
  items: []
}

// REDUCER

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return {...state, fetching: true}
    case FETCH_CATEGORY_ERROR:
      return {...state, errored: true}
    case FETCH_CATEGORY_SUCCESS:
      return {...state, items: action.payload}
    default:
      return state
  }
}

export default categoryReducer

// SELECTORS

export const getCategoryItems = state => state.items
