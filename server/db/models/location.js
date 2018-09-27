const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Location
