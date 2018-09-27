const Sequelize = require('sequelize')
const db = require('../db')

const Home = db.define('home', {
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'img/book.jpg'
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Home
