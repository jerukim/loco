const {expect} = require('chai')
const db = require('../..')
const Home = db.model('home')
const Location = db.model('location')

describe('Home model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('saving instances', () => {
    it('saves an instance to the database', async () => {
      const location = {
        id: 1,
        lat: 41.9171507,
        lng: -87.647284,
        address: '1932 N Burling Street, Chicago, IL 60614'
      }

      const {id} = await Location.create(location)

      const house = {
        imageUrl: 'https://bit.ly/2DzCuH1',
        price: 33,
        locationId: id
      }

      const data = await Home.create(house)
      expect(data.price).to.equal(house.price)
      expect(data.locationId).to.equal(house.locationId)
    })
  })
})
