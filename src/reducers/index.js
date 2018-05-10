import { combineReducers } from 'redux';
import users from './users';
import companies from './companies';
import zones from './zones';
import vehicles from './vehicles';
import trails from './trails';
import map from './map';
import geoFences from './geoFences';

export default combineReducers({ users, companies, zones, vehicles, trails, map, geoFences });