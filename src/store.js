import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';

const createSelector = (initialState = {}) => {
  // Add thunkMiddleware to support async operations in regular redux actions
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  // Enable DevTools support only for development environment
  const composedEnhancers = (process.env.NODE_ENV !== 'production' ? composeWithDevTools : compose)(...enhancers);
  const store = createStore(rootReducer, initialState, composedEnhancers);
  // Enable 'Hot Reload' feature to allow selective reducer reload on each update
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }
  return store;
};

export default createSelector;
