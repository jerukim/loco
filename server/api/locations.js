const router = require('express').Router()
const {Location} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {address, lat, lng} = req.body
    const [location] = await Location.findOrCreate({
      where: {address, lat, lng}
    })
    console.log('Location found or created', location)
    res.json(location)
  } catch (err) {
    next(err)
  }
})
