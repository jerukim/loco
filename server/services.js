const axios = require('axios')
require('../secrets')
const key = process.env.GOOGLE_API_KEY_SERVER_SIDE

const getDistance = async (start, end) => {
  const modes = ['driving', 'walking', 'bicycling', 'transit']
  try {
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

      // console.log(modes[i])
      // console.log('INDEX', i)
      // console.log('Raw data:', data)
      // console.log('---------------------------------------')
      // console.log('Google distances', data.rows[0].elements)
      // console.log('---------------------------------------')
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = {getDistance}
