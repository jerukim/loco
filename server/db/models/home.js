const Sequelize = require('sequelize')
const db = require('../db')

const Home = db.define('home', {
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://bit.ly/2DDPIm8'
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Home
