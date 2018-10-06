const axios = require('axios')
require('../secrets')
const serverKey = process.env.GOOGLE_API_KEY_SERVER_SIDE
const key = process.env.GOOGLE_API_KEY

const getDistanceFromGoogle = async (start, end, mode) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
      start.lat
    },${start.lng}&destinations=${end.lat},${
      end.lng
    }&mode=${mode}&key=${serverKey}`
    const {data} = await axios({
      method: 'get',
      url
    })
    return data
  } catch (err) {
    console.error(
      'And error occurred while calling Google Distance Matrix',
      err
    )
  }
}

const getStreetViewUrl = async (lat, lng, height, width) => {
  return `https://maps.googleapis.com/maps/api/streetview?size=${width}x${height}&location=${lat},${lng}&key=${serverKey}`
}

const getCategoryResults = async (coordinates, category) => {
  const {lat, lng} = coordinates
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&type=${category}&keyword=${category}&key=${key}`

    const {data} = await axios.get(url)

    return data
  } catch (err) {
    console.error('an error occured while calling google place search', err)
  }
}

module.exports = {getDistanceFromGoogle, getStreetViewUrl, getCategoryResults}
