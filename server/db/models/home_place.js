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
  const modes = ['driving', 'walking', 'bicycling', 'transit']
  const getLatLng = ({lat, lng}) => ({lat, lng})
  let updated

  try {
    for (let i = 0; i < modes.length; i++) {
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
      const start = getLatLng(data.location)
      const end = getLatLng(data.homes[0].location)

      const googleData = await getDistanceFromGoogle(start, end, modes[i])
      const {distance, duration} = googleData.rows[0].elements[0]
      updated = await instance.update(
        {
          distanceText: distance.text,
          distanceValue: distance.value,
          [`${modes[i]}Text`]: duration.text,
          [`${modes[i]}Value`]: duration.value
        },
        {where: {id: instance.id}, returning: true, plain: true}
      )
    }

    return updated
  } catch (err) {
    console.error('An error occured in HomePlace.afterCreate hook', err)
  }
})

module.exports = HomePlace
