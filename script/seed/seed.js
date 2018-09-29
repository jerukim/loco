'use strict'

const userData = [
  {
    firstName: 'Cody',
    lastName: 'Pug',
    email: 'cody@email.com',
    password: '123'
  },
  {
    firstName: 'Murphy',
    lastName: 'Dog',
    email: 'murphy@email.com',
    password: '123'
  }
]

const locationData = [
  {
    id: 1,
    lat: 41.9171507,
    lng: -87.647284,
    address: '1932 N Burling Street, Chicago, IL 60614'
  },
  {
    id: 2,
    lat: 41.9163896,
    lng: -87.6478731,
    address: '1909 N Orchard Street, Chicago, IL 60614'
  },
  {
    id: 3,
    lat: 41.8952701,
    lng: -87.6412238,
    address: '405 W Superior St, Chicago, IL 60654'
  },
  {
    id: 4,
    lat: 41.8844878,
    lng: -87.6338603,
    address: '100 W Randolph St, Chicago, IL 60601'
  },
  {
    id: 5,
    lat: 41.9090381,
    lng: -87.629484,
    address: '1443 N Astor St, Chicago, IL 60610'
  },
  {
    id: 6,
    lat: 41.922028,
    lng: -87.6467147,
    address: '620 W Webster Ave, Chicago, IL 60614'
  },
  {
    id: 7,
    lat: 41.897034,
    lng: -87.6257315,
    address: '800 N Michigan Ave #5801 Park Tower, Chicago, IL 60611'
  },
  {
    id: 8,
    lat: 41.8997054,
    lng: -87.6297925,
    address: '11 E Walton St PH 5800, Chicago, IL 60611'
  }
]
const homeData = [
  {
    id: 1,
    locationId: 1,
    price: 50000000,
    imageUrl: 'https://bit.ly/2R3GLFx'
  },
  {
    id: 2,
    locationId: 2,
    price: 15500000,
    imageUrl: 'https://bit.ly/2N7GYnO'
  },
  {
    id: 3,
    locationId: 7,
    price: 11000000,
    imageUrl: 'https://bit.ly/2Ilv7BX'
  },
  {
    id: 4,
    locationId: 8,
    price: 10950000,
    imageUrl: 'https://bit.ly/2DzCuH1'
  }
]
const placeData = [
  {
    id: 1,
    name: 'Work',
    locationId: 3
  },
  {
    id: 2,
    name: 'Work',
    locationId: 4
  },
  {
    id: 3,
    name: `Mom's House`,
    locationId: 5
  },
  {
    id: 4,
    name: 'OZ Animal Hospital',
    locationId: 6
  }
]

const categoryData = [
  'supermarket',
  'gym',
  'pharmacy',
  'laundry',
  'library',
  'church',
  'mosque',
  'synagogue',
  'hindu_temple',
  'bus_station',
  'train_station',
  'subway_station'
]

const userHomeData = [
  {userId: 1, homeId: 1},
  {userId: 1, homeId: 2},
  {userId: 2, homeId: 3},
  {userId: 2, homeId: 4}
]

const userCategoryData = [
  {userId: 1, categoryId: 1, priority: 1},
  {userId: 1, categoryId: 2, priority: 2},
  {userId: 1, categoryId: 11, priority: 3},
  {userId: 2, categoryId: 1, priority: 1},
  {userId: 2, categoryId: 3, priority: 2},
  {userId: 2, categoryId: 5, priority: 3}
]

const homePlaceData = [
  {homeId: 1, placeId: 1},
  {homeId: 1, placeId: 3},
  {homeId: 2, placeId: 2},
  {homeId: 2, placeId: 4}
]

module.exports = {
  userData,
  locationData,
  homeData,
  placeData,
  categoryData,
  userHomeData,
  userCategoryData,
  homePlaceData
}
