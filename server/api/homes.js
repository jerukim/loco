const router = require('express').Router()
const {User, Home} = require('../db/models')
module.exports = router

router.post('/:userId', async (req, res, next) => {
  const {userId} = req.params
  try {
    const home = await Home.create({
      include: [{model: User, where: {id: userId}}]
    })
    res.json(home)
  } catch (err) {
    next(err)
  }
})
