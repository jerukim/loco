const router = require('express').Router()
const {Place, Home, Location} = require('../db/models')
module.exports = router

router.get('/:homeId', async (req, res, next) => {
  const {homeId} = req.params
  try {
    const places = await Place.findAll({
      include: [{model: Location}, {model: Home, where: {id: homeId}}]
    })
    res.json(places)
  } catch (err) {
    next(err)
  }
})
