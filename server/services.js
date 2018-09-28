const axios = require('axios')
const key = process.env.GOOGLE_API_KEY_SERVER_SIDE
// const key = 'AIzaSyDEHtZAvQJaxZrrPJfO_ZgdupfhTkshDic'

const getDistance = async (start, end) => {
  try {
    const modes = ['driving', 'walking', 'bicycling', 'transit']
    for (let i = 0; i < modes.length; i++) {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
        start.lat
      },${start.lng}&destinations=${end.lat},${end.lng}&mode=${
        modes[i]
      }&key=${key}`
      const {data} = await axios({
        method: 'get',
        url
      })
      console.log(modes[i])
      console.log('Raw data:', data)
      console.log('Google distances', data.rows[0].elements)
    }
  } catch (err) {
    console.error(err)
  }
}

// getDistance(
//   {lat: 41.9171164, lng: -87.6497521},
//   {lat: 41.9123269, lng: -87.6508881}
// )

module.exports = {getDistance}
