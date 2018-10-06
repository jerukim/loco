import axios from 'axios'

const GOT_PRIORITIES = 'GOT_PRIORITIES'

export const gotPriorities = priorities => ({
  type: GOT_PRIORITIES,
  priorities
})

export const getPriorities = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/ priorities`)
    dispatch(gotPriorities(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_PRIORITIES:
      return action.priorities
    default:
      return state
  }
}
