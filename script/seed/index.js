'use strict'
const {
  userData,
  locationData,
  homeData,
  placeData,
  categoryData,
  userHomeData,
  prioritiesData,
  homePlaceData
} = require('./seed')

const db = require('../../server/db')
const {
  User,
  Location,
  Home,
  Place,
  Category,
  UserHome,
  Priority,
  HomePlace
} = require('../../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(userData.map(user => User.create(user)))
  console.log(`seeded ${users.length} users`)

  const locations = await Promise.all(
    locationData.map(location => Location.create(location))
  )
  console.log(`seeded ${locations.length} locations`)

  const homes = await Promise.all(homeData.map(home => Home.create(home)))
  console.log(`seeded ${homes.length} homes`)

  const places = await Promise.all(placeData.map(place => Place.create(place)))
  console.log(`seeded ${places.length} places`)

  const categories = await Promise.all(
    categoryData.map(category => Category.create({type: category}))
  )
  console.log(`seeded ${categories.length} categories`)

  const userHomes = await Promise.all(
    userHomeData.map(data => UserHome.create(data))
  )
  console.log(`seeded ${userHomes.length} userHomes`)

  const priorities = await Promise.all(
    prioritiesData.map(data => Priority.create(data))
  )
  console.log(`seeded ${priorities.length} priorities`)

  const homePlaces = []
  for (let i = 0; i < homePlaceData.length; i++) {
    const result = await HomePlace.create(homePlaceData[i])
    homePlaces.push(result)
  }

  console.log(`seeded ${homePlaces.length} homePlaces`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
