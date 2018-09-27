const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = Location
