import axios from 'axios'

import {fetchHomeCategories} from './'

const GOT_CATEGORY_RESULTS = 'GOT_CATEGORY_RESULTS'

export const gotCategoryResults = categoryResults => ({
  type: GOT_CATEGORY_RESULTS,
  categoryResults
})

export const fetchCategoryResults = (userId, homes) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/categories/${userId}`)
    const categoryResults = {}

    const categories = data.filter(item => item.categoryId !== null)

    const homePromises = homes.map(async home => {
      const homeInfo = home.location
      const coordinates = {
        lat: homeInfo.lat,
        lng: homeInfo.lng
      }
      categoryResults[home.id] = {}

      const catPromises = categories.map(async category => {
        const payload = await axios.post(`/api/google/categoryResults`, {
          coordinates,
          category: category.label
        })
        categoryResults[home.id][category.categoryId] = payload.data.results
      })

      await Promise.all(catPromises)
    })

    await Promise.all(homePromises)

    dispatch(fetchHomeCategories(homes, categoryResults, categories))
    dispatch(gotCategoryResults(categoryResults))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_CATEGORY_RESULTS:
      return action.categoryResults
    default:
      return state
  }
}
