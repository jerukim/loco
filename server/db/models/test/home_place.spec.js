const chai = require('chai')
const {expect} = chai
const db = require('../..')
const {Home, Place, HomePlace} = require('../index')
const Location = db.model('location')

const loc1 = {
  id: 1,
  lat: 41.8844878,
  lng: -87.6338603,
  address: '1932 N Burling Street, Chicago, IL 60614'
}
const loc2 = {
  id: 2,
  lat: 41.9171507,
  lng: -87.647284,
  address: '1932 N Burling Street, Chicago, IL 60614'
}

describe('HomePlace model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('saving instances', () => {
    it('saves an instance to the database', async () => {
      const {id: id1} = await Location.create(loc1)
      const {id: id2} = await Location.create(loc2)

      const house = {
        imageUrl: 'https://bit.ly/2DzCuH1',
        price: 33,
        locationId: id1
      }

      const place = {
        name: `Mom's house`,
        locationId: id2
      }
      const {id: homeId} = await Home.create(house)
      const {id: placeId} = await Place.create(place)
      const data = await HomePlace.create({homeId, placeId})
      expect(data.homeId).to.equal(homeId)
      expect(data.placeId).to.equal(placeId)
    })
  })
})
