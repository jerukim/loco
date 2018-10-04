const router = require('express').Router()
const {Category, Priority} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

// All Categories for Category Filter menu
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

// User's Selected Categories
router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params
  try {
    let categories = await Priority.findAll({
      attributes: {exclude: ['id', 'placeId', 'createdAt', 'updatedAt']},
      where: {
        userId: userId,
        [Op.and]: {
          categoryId: {
            [Op.gt]: 0
          }
        }
      },
      order: ['priority']
    })
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})
