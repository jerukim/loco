const Sequelize = require('sequelize')
const db = require('../db')
const Place = require('./place')
const Home = require('./home')
const Location = require('./location')
const {getDistance} = require('../../services')

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
  try {
    const data = await Place.findOne({
      include: [{model: Home, include: [{model: Location}]}, {model: Location}]
    })
    const getLatLng = ({lat, lng}) => ({lat, lng})
    const start = getLatLng(data.location)
    const end = getLatLng(data.homes[0].location)
    // console.log('DATA', getLatLng(data.location))
    // console.log('HOMES', getLatLng(data.homes[0].location))
    const distance = await getDistance(start, end)
    // console.log(distance)
  } catch (err) {
    console.error(err)
  }
})

module.exports = HomePlace
