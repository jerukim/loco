const Sequelize = require('sequelize')
const db = require('../db')

const HomePlace = db.define('home_place', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  distance: {
    type: Sequelize.INTEGER
  }
})

module.exports = HomePlace
