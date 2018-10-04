const router = require('express').Router()
const {Home} = require('../db/models')
module.exports = router

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
