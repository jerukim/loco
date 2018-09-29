import axios from 'axios'

const GOT_HOMES = 'GOT_HOMES'
const POST_HOME = 'POST_HOME'

const gotHomes = homes => ({type: GOT_HOMES, homes})

export const fetchHomes = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/homes`)
    const homes = data.homes
    dispatch(gotHomes(homes))
  } catch (err) {
    console.error(err)
  }
}

// export const postHome = userId => async dispatch => {
//   try {
//     const
//   }
// }

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_HOMES:
      return action.homes
    default:
      return state
  }
}
