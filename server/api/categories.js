const router = require('express').Router()
const {Category, UserCategory} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let categories = await Category.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})
