import { combineReducers } from 'redux';

const routes = (state = { mapProps: {
    "kml": "http://drive.google.com/file/d/0B5QeQuhUHrubdUV0RmJJT2s1ZnBoRzJueHZ4eDdyY2lxRVFR/view",
    "defLat": 10.99901,
    "defLong": -74.80365,
    "defZoom": 9
}, data: [] }, action) => {
    switch (action.type) {
        case 'FETCH_ROUTES':
        return {
            ...state,
            data: action.routes,
        };        
        case 'PRINT_ROUTE':
          return {
              ...state,
              mapProps: action.mapProps,
          };
        default:
            return state;
    }
};

export default combineReducers({
    routes,
});