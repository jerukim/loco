const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../..')
const {Home, Location} = require('../../db/models')

describe('Homes routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/homes', async () => {
    const location = {
      id: 2,
      lat: 41.9171507,
      lng: -87.647284,
      address: '1932 N Burling Street, Chicago, IL 60614'
    }

    const {id} = await Location.create(location)

    const home = {
      imageUrl: 'https://bit.ly/2DzCuH1',
      price: 33,
      locationId: id
    }

    await Home.create(home)

    it('GET /api/homes', async () => {
      const res = await request(app)
        .get('/api/homes')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.location.id).to.equal(2)
    })
  })
})
