const router = require('express').Router()
const {Home, Location} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const homes = await Home.findAll({
    include: [{model: Location}]
  })
  res.json(homes)
})
