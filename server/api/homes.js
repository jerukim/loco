const router = require('express').Router()
const {User, Home, Location} = require('../db/models')
module.exports = router

// GET user_homes
router.get('/', async (req, res, next) => {
  const {userId} = req.params
  try {
    const userHomes = await User.findOne({
      where: {id: userId},
      include: [{model: Home, include: [{model: Location}]}]
    })
    res.json(userHomes)
  } catch (err) {
    next(err)
  }
})

// POST homes
router.post('/', async (req, res, next) => {
  const {imgUrl, locationId} = req.body
  try {
    const home = await Home.create({imgUrl, locationId})
    res.json(home)
  } catch (err) {
    next(err)
  }
})
