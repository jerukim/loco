const router = require('express').Router()
const {User, UserHome, UserPlace} = require('../db/models')
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
router.use('/:userId/homes', require('./homes'))

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
router.use('/:userId/places', require('./places'))

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
