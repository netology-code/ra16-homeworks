import { createStore, combineReducers } from 'redux';
import serviceListReducer from '../reducers/serviceList';
import serviceAddReducer from '../reducers/serviceAdd';

const rootReducer = combineReducers({
  serviceList: serviceListReducer,
  serviceAdd: serviceAddReducer
});

const store = createStore(rootReducer);

export default store;