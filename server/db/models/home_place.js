const Sequelize = require('sequelize')
const db = require('../db')
const Home = require('./home')
const Place = require('./place')

const HomePlace = db.define('home_palce', {
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
