import { createStore, combineReducers, compose } from 'redux';
import * as reducers from '../reducers/index';

const finalCreateStore = compose(createStore);

const larkReducer = combineReducers(reducers);

export default function configureStore(initialState) {
  return finalCreateStore(larkReducer, initialState);
}
