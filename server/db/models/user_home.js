const Sequelize = require('sequelize')
const db = require('../db')

const UserHome = db.define('user_home', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = UserHome
