const router = require('express').Router()
const {Place, Home} = require('../db/models')
module.exports = router

// router.get('/', async (req, res, next) => {
//   const {homeId} = req.params
//   try {
//     const homePlaces = await Home.findAll({
//       include: [{model: Place, where: {homeId}}]
//     })
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/', async (req, res, next) => {
  const {name, locationId} = req.body
  try {
    const place = await Place.create({name, locationId})
    res.json(place)
  } catch (err) {
    next(err)
  }
})
