const Sequelize = require('sequelize')
const db = require('../db')

const UserHome = db.define('user_home', {})

module.exports = UserHome
