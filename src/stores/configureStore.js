import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './rootReducer'

const middlewares = [thunk]

if (__DEV__) {
  middlewares.push(logger)
}

const configureStore = () => {
  return createStore(reducers, {}, applyMiddleware(...middlewares))
}

export default configureStore
