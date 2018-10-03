const router = require('express').Router()
const {Home} = require('../db/models')
module.exports = router

// POST homes
router.post('/', async (req, res, next) => {
  const {locationId} = req.body
  try {
    const home = await Home.create({locationId})
    res.json(home)
  } catch (err) {
    next(err)
  }
})

router.put('/:homeId', async (req, res, next) => {
  const {locationId, link, price} = req.body
  const {homeId} = req.params

  try {
    await Home.update(
      {locationId, link, price},
      {
        where: {id: homeId}
      }
    )
    res.json(204).end()
  } catch (err) {
    next(err)
  }
})
