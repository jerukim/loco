const router = require('express').Router()
const {Place} = require('../db/models')
module.exports = router

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

router.put('/:placeId', async (req, res, next) => {
  const {placeId} = req.params
})
