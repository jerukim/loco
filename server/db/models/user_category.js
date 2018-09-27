const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Category = require('./categorys')

const UserCategory = db.define('user_category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  priority: {
    priority: Sequelize.INTEGER
  }
})

module.exports = UserCategory
