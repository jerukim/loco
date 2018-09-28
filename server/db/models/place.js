const Sequelize = require('sequelize')
const db = require('../db')
const {HomePlace} = require('../db')
const Home = db.model('home')

const Place = db.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

// Place.afterCreate(async place => {
//   try {
//     const data = await Place.findAll({
//       include: [{model: Home}]
//     })
//     console.log(data)
//   } catch (err) {
//     console.error(err)
//   }
// })

module.exports = Place
