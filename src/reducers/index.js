import { combineReducers } from 'redux';
import trails from './trails';
import vehicles from './vehicles';
import zones from './zones';
import clients from './clients';
import map from './map';
import geoFences from './geoFences';

export default combineReducers({ clients, trails, vehicles, zones, map, geoFences });