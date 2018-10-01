const router = require('express').Router()
const {
  Category,
  Home,
  Location,
  User,
  UserHome
} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/homes', async (req, res, next) => {
  const {userId} = req.params
  try {
    const homes = await User.findOne({
      where: {id: userId},
      include: [{model: Home, include: [{model: Location}]}]
    })
    res.status(200).json(homes)
  } catch (err) {
    next(err)
  }
})

router.post('/homes', async (req, res, next) => {
  const {userId, homeId} = req.body
  try {
    await UserHome.create({userId, homeId})
    res.status(201).end()
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/categories', async (req, res, next) => {
  try {
    let {userId} = req.params
    let selectedCategories = await User.findOne({
      where: {id: userId},
      include: [
        {
          model: Category,
          attributes: {exclude: ['createdAt', 'updatedAt']}
        }
      ],
    })
    res.status(200).json(selectedCategories)
  } catch (err) {
    next(err)
  }
})
