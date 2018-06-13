import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
// import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'
import { createStore, applyMiddleware, compose } from 'redux';

 
const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore
