import axios from 'axios'

// ACTION TYPES

const FETCH_SELECTED_CATEGORIES_REQUEST = 'FETCH_SELECTED_CATEGORIES_REQUEST'
const FETCH_SELECTED_CATEGORIES_SUCCESS = 'FETCH_SELECTED_CATEGORIES_SUCCESS'
const FETCH_SELECTED_CATEGORIES_ERROR = 'FETCH_SELECTED_CATEGORIES_ERROR'
const ADD_NEW_SELECTED_FILTER = 'ADD_NEW_SELECTED_FILTER'
const REMOVE_SELECTED_FILTER = 'REMOVE_SELECTED_FILTER'

// ACTION CREATORS

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

export const addNewSelectedFilter = category => ({
  type: ADD_NEW_SELECTED_FILTER,
  payload: category
})

export const removeSelectedFilter = category => ({
  type: ADD_NEW_SELECTED_FILTER,
  payload: category
})

// THUNK CREATORS

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
  selectedCategoriesErrored: false,
  selectedCategoriesFetching: false,
  selectedCategories: []
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
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
      return {
        ...state,
        selectedCategories: [...state.selectedCategories, action.payload]
      }
    case REMOVE_SELECTED_FILTER:
      return {
        ...state,
        selectedCategories: [
          ...state.selectedCategories.slice(0, action.payload),
          ...state.sselectedCategories.slice(action.payload + 1)
        ]
      }
    default:
      return state
  }
}
