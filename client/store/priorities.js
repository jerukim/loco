import axios from 'axios'

const GOT_PRIORITES = 'GOT_PRIORITES'

export const gotPriorities = priorities => ({
  type: GOT_PRIORITES,
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
    case GOT_PRIORITES:
      return action.priorities
    default:
      return state
  }
}
