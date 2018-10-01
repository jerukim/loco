const {expect} = require('chai')
const db = require('../..')
const Category = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('saving instances', () => {
    it('saves a category type', async () => {
      const data = await Category.create({type: 'example'})
      expect(data.type).to.equal('example')
    })
  })
})
