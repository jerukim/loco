const {expect} = require('chai')
const db = require('../..')
const Location = db.model('location')

describe('Location model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('saving instances', () => {
    it('saves an instance to the database', async () => {
      const house = {
        id: 1,
        lat: 41.9171507,
        lng: -87.647284,
        address: '1932 N Burling Street, Chicago, IL 60614'
      }

      const data = await Location.create(house)
      expect(data.address).to.equal(house.address)
    })
  })
})
