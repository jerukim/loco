const router = require('express').Router()
const {Location} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {address, lat, lng} = req.body
    const location = await Location.create({address, lat, lng})
    res.json(location)
  } catch (err) {
    next(err)
  }
})
