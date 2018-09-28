const axios = require('axios')
require('../secrets')
const key = process.env.GOOGLE_API_KEY_SERVER_SIDE

const getDistanceFromGoogle = async (start, end, mode) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
      start.lat
    },${start.lng}&destinations=${end.lat},${end.lng}&mode=${mode}&key=${key}`
    const {data} = await axios({
      method: 'get',
      url
    })
    return data
  } catch (err) {
    console.error(err)
  }
}

module.exports = {getDistanceFromGoogle}
