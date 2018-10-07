const Sequelize = require('sequelize')
const db = require('../db')

const Priority = db.define('priority', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  priority: {
    type: Sequelize.INTEGER
  }
})

module.exports = Priority
