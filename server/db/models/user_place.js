const Sequelize = require('sequelize')
const db = require('../db')

const UserPlace = db.define('user_place', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = UserPlace
