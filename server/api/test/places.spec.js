const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../..')
const {Place, Location} = require('../../db/models')

describe('Places routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/places', async () => {
    const location = {
      id: 1,
      lat: 41.9171507,
      lng: -87.647284,
      address: '1932 N Burling Street, Chicago, IL 60614'
    }

    const {id} = await Location.create(location)

    const place = {
      name: 'Work',
      locationId: id
    }

    await Place.create(place)

    it('GET /api/places', async () => {
      const res = await request(app)
        .get('/api/places')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.location.id).to.equal(1)
    })
  })
})
