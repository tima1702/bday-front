import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../Reducers';
import reduxMiddleware from '../Utils/reduxMiddleware';

export default function (initialState = {}) {
  let middleware = applyMiddleware(reduxMiddleware);

  if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools({})(middleware);
  }

  return createStore(rootReducer, initialState, middleware);
};
