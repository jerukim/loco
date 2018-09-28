const Sequelize = require('sequelize')
const db = require('../db')
const Place = require('./place')
const Home = require('./home')
const Location = require('./location')
const {getDistanceFromGoogle} = require('../../services')

const HomePlace = db.define('home_place', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  distanceValue: {
    type: Sequelize.INTEGER
  },
  distanceText: {
    type: Sequelize.STRING
  },
  walkingValue: {
    type: Sequelize.INTEGER
  },
  walkingText: {
    type: Sequelize.STRING
  },
  drivingValue: {
    type: Sequelize.INTEGER
  },
  drivingText: {
    type: Sequelize.STRING
  },
  bicyclingValue: {
    type: Sequelize.INTEGER
  },
  bicyclingText: {
    type: Sequelize.STRING
  },
  transitValue: {
    type: Sequelize.INTEGER
  },
  transitText: {
    type: Sequelize.STRING
  }
})

HomePlace.afterCreate(async instance => {
  console.log('Home Id:', instance.homeId)
  console.log('Place Id:', instance.placeId)
  const modes = ['driving', 'walking', 'bicycling', 'transit']
  const getLatLng = ({lat, lng}) => ({lat, lng})

  try {
    // for (let i = 0)
    const data = await Place.findOne({
      where: {
        id: instance.placeId
      },
      include: [
        {
          model: Home,
          where: {id: instance.homeId},
          include: [{model: Location}]
        },
        {model: Location}
      ]
    })
    console.log('place data:', data.name)
    const start = getLatLng(data.location)
    const end = getLatLng(data.homes[0].location)
    console.log('Start', start)
    console.log('End', end)

    const googleData = await getDistanceFromGoogle(start, end, 'walking')
    console.log('Google data:', googleData.rows[0].elements[0])
    const {distance, duration} = googleData
    instance.update({
      distanceText: distance.text,
      distanceValue: distance.value,
      [`${'walking'}Text`]: duration.text,
      [`${'walking'}Value`]: duration.value
    })
  } catch (err) {
    console.error('An error occured while fetching distances', err)
  }
})

module.exports = HomePlace

// const {distance, duration} = await googleData[0]
