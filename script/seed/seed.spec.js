'use strict'
/* global describe beforeEach it */

const seed = require('./index')

describe('seed script', done => {
  it('completes successfully', () => {
    seed(err => {
      if (err) done(err)
      else done()
    })
  })
})
