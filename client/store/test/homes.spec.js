// test not finished
// leave here for now
import {expect} from 'chai'
import {axios} from 'axios'
import {fetchHomes, postHome} from '../homes'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('homes thunk creators', () => {
  let store
  let mockAxios

  const initlaState = {homes: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })
})
