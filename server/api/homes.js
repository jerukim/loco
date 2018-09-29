const router = require('express').Router()
const {User, Home, Location} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params
  try {
    const homes = await Home.findAll({
      include: [{model: Location}, {model: User, where: {id: userId}}]
    })
    res.json(homes)
  } catch (err) {
    next(err)
  }
})
