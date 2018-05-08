import { combineReducers } from 'redux';
import trails from './trails';
import vehicles from './vehicles';
import zones from './zones';
import users from './users';
import map from './map';
import geoFences from './geoFences';

export default combineReducers({ users, trails, vehicles, zones, map, geoFences });