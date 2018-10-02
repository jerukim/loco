import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import user from './user'
import coordinates from './coordinates'
import homes from './homes'
import places from './places'

const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  user,
  homes,
  places,
  coordinates
})

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

export const store = createStore(persistedReducer, middleware)
export const persistor = persistStore(store)

export * from './user'
export * from './coordinates'
export * from './homes'
export * from './places'
