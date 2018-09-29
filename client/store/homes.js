import axios from 'axios'

const GOT_HOMES = 'GOT_HOMES'

const gotHomes = homes => ({type: GOT_HOMES, homes})

export const fetchHomes = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/homes')
    dispatch(gotHomes(data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_HOMES:
      return action.homes
    default:
      return state
  }
}
