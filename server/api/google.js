const router = require('express').Router()

const {getCategoryResults, getDistanceFromGoogle} = require('../services')

module.exports = router

router.post('/categoryResults/', async (req, res, next) => {
  try {
    const {coordinates, category} = req.body
    const data = await getCategoryResults(coordinates, category)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/categoryDistances', async (req, res, next) => {
  try {
    const {start, end, mode} = req.body
    const data = await getDistanceFromGoogle(start, end, mode)
    res.json(data)
  } catch (err) {
    next(err)
  }
})
