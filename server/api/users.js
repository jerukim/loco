const router = require('express').Router()
const {
  Category,
  Home,
  Location,
  User,
  UserHome,
  UserPlace,
  Place,
  HomePlace
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
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

// GET user_homes
router.get('/:userId/homes', async (req, res, next) => {
  const {userId} = req.params
  try {
    const userHomes = await User.findOne({
      where: {id: userId},
      include: [
        {
          model: Home,
          include: [
            {
              model: Location
            }
          ]
        }
      ]
    })
    res.status(200).json(userHomes)
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
      include: [
        {
          model: Place,
          include: [{model: Home}]
        }
      ]
    })
    res.status(200).json(places)
  } catch (err) {
    next(err)
  }
})

// POST user_places
router.post('/places', async (req, res, next) => {
  const {userId, placeId} = req.body
  try {
    await UserPlace.create({userId, placeId})
    res.status(201).end()
  } catch (err) {
    next(err)
  }
})

// GET user_categories
// WORKING VERSION - DEEPLY NESTED RESULT
router.get('/:userId/categories', async (req, res, next) => {
  let {userId} = req.params
  try {
    let UserCategories = await User.findOne({
      include: [
        {
          model: Category,
          attributes: {exclude: ['createdAt', 'updatedAt']}
        }
      ],
      where: {id: userId},
    })
    res.status(200).json(UserCategories)
  } catch (err) {
    next(err)
  }
})
