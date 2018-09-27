'use strict'

export const locationData = [{
  id: 1,
  lat: 41.9171164,
  lng: 87.6497521,
  address: '1932 N Burling Street, Chicago, IL 60614'
}, {
  id: 2,
  lat: 41.9163896,
  lng: -87.6478784,
  address: '1909 N Orchard Street, Chicago, IL 60614'
}, {
  id: 3,
  lat: 41.8952701,
  lng: -87.6412291,
  address: '405 W Superior St, Chicago, IL 60654'
}, {
  id: 4,
  lat: 41.8844878,
  lng: -87.6324047,
  address: '100 W Randolph St, Chicago, IL 60601'
}, {
  id: 5,
  lat: 41.9090381,
  lng: -87.6294893,
  address: '1443 N Astor St, Chicago, IL 60610'
}, {
  id: 6,
  lat: 41.9123269,
  lng: -87.6508881,
  address: '620 W Webster Ave, Chicago, IL 60614'
}]
export const homeData = [{
  locationId: 1,
  price: 50000000,
  imageUrl: 'https://bit.ly/2R3GLFx',
}, {
  locationId: 2,
  price: 15500000,
  imageUrl: 'https://bit.ly/2N7GYnO',
}]
export const placeData = [{
  name: 'Work',
  locationId: 3,
}, {
  name: 'Work',
  locationId: 4,
}, {
  name: `Mom's House`,
  locationId: 5
}, {
  name: 'OZ Animal Hospital',
  locationId: 6
}]

export const categoryData = ['supermarket', 'gym', 'pharmacy', 'laundry', 'library', 'church', 'mosque', 'synagogue', 'hindu_temple', 'bus_station', 'train_station', 'subway_station']

export const userHomeData = [{userId: 1, homeId: 1}, {userId: 1, homeId: 2}, {userId: 2, homeId: 3}, {userId: 2, homeId: 4},]

export const userCategoryData = [{userId: 1, categoryId: 1, priority: 1}, {userId: 1, categoryId: 2, priority: 2}, {userId: 1, categoryId: 11, priority: 3}, {userId: 2, categoryId: 1, priority: 1}, {userId: 2, categoryId: 3, priority: 2}, {userId: 3, categoryId: 5, priority: 3}]

export const homePlaceData = [{homeId: 1, placeId: 1}, {homeId: 1, placeId: 3}, {homeId: 2, placeId: }]
