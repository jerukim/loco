const router = require('express').Router()
const {Category} = require('../db/models')
// Neded for RAW query
const Sequelize = require('sequelize')
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
    let categories = await db.query(
      `SELECT COALESCE(categories.type, '') || COALESCE(places.name, '') AS label, priorities.priority, "priorities"."categoryId", "priorities"."placeId"
      FROM priorities
      LEFT JOIN categories ON "priorities"."categoryId" = categories.id
      LEFT JOIN places ON "priorities"."placeId" = places.id
      WHERE "priorities"."userId" = 1
      ORDER BY priorities.priority;`,
      {replacements: {userId: userId}, type: Sequelize.QueryTypes.SELECT}
    )
    res.status(200).json(categories)
  } catch (err) {
    next(err)
  }
})
