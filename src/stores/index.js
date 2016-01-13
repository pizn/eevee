import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middleware/promiseMiddleware';
import * as reducers from '../reducers/index';
import thunk from 'redux-thunk';
const finalCreateStore = compose(
  applyMiddleware(thunk, promiseMiddleware)
)(createStore);

const larkReducer = combineReducers(reducers);

export default function configureStore(initialState) {
  return finalCreateStore(larkReducer, initialState);
}
