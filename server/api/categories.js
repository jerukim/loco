const router = require('express').Router()
const {Category} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let categories = await Category.findAll()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})
