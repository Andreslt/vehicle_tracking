import { combineReducers } from 'redux';
import trails from './trails';
import vehicles from './vehicles';
import zones from './zones';

export default combineReducers({ trails, vehicles, zones });