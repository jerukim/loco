const Sequelize = require('sequelize')
const db = require('../db')
const {Home, Place, Location} = require('../db')
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

// HomePlace.afterCreate(async instance => {
//   try {
//     const data = await HomePlace.findAll({
//       // include: [{model: Home}, {model: Place}],
//       include: [{all: true, include: [{model: Location, raw: true}]}],
//       raw: true
//     })
//     console.log(data)
//   } catch (err) {
//     console.error(`Error occurred in 'afterCreate' hook`)
//   }
// })

module.exports = HomePlace
