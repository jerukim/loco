const router = require('express').Router()
const {Home} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  const {imageUrl, locationId} = req.body
  try {
    const home = await Home.create({imageUrl, locationId})
    res.json(home)
  } catch (err) {
    next(err)
  }
})
