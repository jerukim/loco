const router = require('express').Router()
const Sequelize = require('sequelize')
const {Category} = require('../db/models')
// Neded for RAW query
const pkg = require('../../package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)

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
  let {userId} = req.params
  try {
    let UserCategories = await db.query(
      `SELECT user_categories.priority, categories.type, categories.id
      FROM categories
      JOIN user_categories ON "user_categories"."categoryId" = categories.id
      WHERE "user_categories"."userId" = :userId
      ORDER BY user_categories.priority;`,
      {replacements: {userId: userId}, type: Sequelize.QueryTypes.SELECT}
    )
    console.log('USER CATEGORIES: ', UserCategories)
    res.status(200).json(UserCategories)
  } catch (err) {
    next(err)
  }
})
