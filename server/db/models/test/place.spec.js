const {expect} = require('chai')
const db = require('../..')
const Place = db.model('place')
const Location = db.model('location')

describe('Home model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('saving instances', () => {
    it('saves an instance to the database', async () => {
      const location = {
        id: 1,
        lat: 41.8844878,
        lng: -87.6338603,
        address: '1932 N Burling Street, Chicago, IL 60614'
      }

      const {id} = await Location.create(location)

      const place = {
        name: 'Work',
        locationId: id
      }

      const data = await Place.create(place)
      expect(data.name).to.equal(place.name)
      expect(data.locationId).to.equal(place.locationId)
    })
  })
})
