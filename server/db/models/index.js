const Category = require('./category')
const Home = require('./home')
const HomePlace = require('./home_place')
const Location = require('./location')
const Place = require('./place')
const User = require('./user')
const UserCategory = require('./user_category')
const UserHome = require('./user_home')

Home.belongsToMany(User, {through: UserHome})
User.belongsToMany(Home, {through: UserHome})

Home.belongsToMany(Place, {through: HomePlace})
Place.belongsToMany(Home, {through: HomePlace})

Category.belongsToMany(User, {through: UserCategory})
User.belongsToMany(Category, {through: UserCategory})

Home.belongsTo(Location)
Place.belongsTo(Location)

module.exports = {
  Category,
  Home,
  Location,
  Place,
  User,
  UserHome,
  UserCategory,
  HomePlace
}
