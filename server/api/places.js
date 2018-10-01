const router = require('express').Router()
const {Place, Location, User} = require('../db/models')
module.exports = router

// GET user_places
router.get('/', async (req, res, next) => {
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

// POST places
router.post('/', async (req, res, next) => {
  const {name, locationId} = req.body
  try {
    const place = await Place.create({name, locationId})
    res.json(place)
  } catch (err) {
    next(err)
  }
})
