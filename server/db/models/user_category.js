const Sequelize = require('sequelize')
const db = require('../db')

const UserCategory = db.define('user_category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  priority: {
    type: Sequelize.INTEGER
  }
})

module.exports = UserCategory
