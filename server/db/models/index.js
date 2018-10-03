const Category = require('./category')
const Home = require('./home')
const HomePlace = require('./home_place')
const Location = require('./location')
const Place = require('./place')
const User = require('./user')
const UserHome = require('./user_home')
const Priority = require('./priority')

Home.belongsToMany(User, {through: UserHome})
User.belongsToMany(Home, {through: UserHome})

Home.belongsToMany(Place, {through: HomePlace})
Place.belongsToMany(Home, {through: HomePlace})

User.belongsToMany(Place, {through: Priority})
Place.belongsToMany(User, {through: Priority})
User.belongsToMany(Category, {through: Priority})
Category.belongsToMany(User, {through: Priority})

Home.belongsTo(Location)
Place.belongsTo(Location)

module.exports = {
  Category,
  Home,
  Location,
  Place,
  User,
  UserHome,
  Priority,
  HomePlace
}
