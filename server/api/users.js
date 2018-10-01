const router = require('express').Router()
const {
  User,
  UserHome,
  Home,
  Location,
  Place,
  UserPlace
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET user_homes
router.get('/:userId/homes', async (req, res, next) => {
  console.log('In GET /api/user/:userId/homes route')
  const {userId} = req.params
  console.log('userId:', userId)
  try {
    const userHomes = await User.findOne({
      where: {id: userId},
      include: [{model: Home, include: [{model: Location}]}]
    })
    console.log('userHomes', userHomes)
    res.json(userHomes)
  } catch (err) {
    next(err)
  }
})

// POST user_homes
router.post('/homes', async (req, res, next) => {
  const {userId, homeId} = req.body
  try {
    await UserHome.create({userId, homeId})
    res.status(201).end()
  } catch (err) {
    next(err)
  }
})

// GET user_places
router.get('/:userId/places', async (req, res, next) => {
  const {userId} = req.params
  try {
    const places = await User.findOne({
      where: {id: userId},
      include: [{model: Place, includes: [{model: Location}]}]
    })
    res.json(places)
  } catch (err) {
    next(err)
  }
})

// POST user_places
router.post('/places', async (req, res, next) => {
  const {userId, placeId} = req.body
  try {
    await UserHome.create({userId, placeId})
    res.status(201).end()
  } catch (err) {
    next(err)
  }
})
