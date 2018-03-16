import { combineReducers } from 'redux';
import routes from './routesReducer';
import trails from './trailsReducer';

export default combineReducers({ routes, trails });