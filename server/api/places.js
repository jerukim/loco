const router = require('express').Router()
const {Place, Location} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const places = await Place.findAll({
    include: [{model: Location}]
  })
  res.json(places)
})
