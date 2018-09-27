const Category = require('./category')
const Home = require('./home')
const HomePlace = require('./lhome_place')
const Location = require('./location')
const Place = require('./place')
const User = require('./user')
const UserCategory = require('./user_category')

// Database Associations:

// Home-User
Home.belongsToMany(User)
User.belongsToMany(Home)

// Home-Place
Home.belongsToMany(Place)
Place.belongsToMany(Home)

//Category-User
Category.belongsToMany(User)
User.belongsToMany(Category)

// Home/Place-Location
Home.belongsTo(Location)
Place.belongsTo(Location)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  Category,
  Home,
  HomePlace,
  Location,
  Place,
  User,
  UserCategory
}
