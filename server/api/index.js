const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/homes', require('./homes'))
router.use('/places', require('./places'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
