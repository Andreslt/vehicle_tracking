import { combineReducers } from 'redux';

const routes = (state = {
    mapProps: {
        "kml": "http://drive.google.com/file/d/0B5QeQuhUHrubdUV0RmJJT2s1ZnBoRzJueHZ4eDdyY2lxRVFR/view",
        "latitude": 10.99901,
        "longitude": -74.80365,
        "zoom": 9
    }, data: []
}, action) => {
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
                currentRoute: action.currentRoute
            };
        case 'LIVE_ROADMAP':
            return {
                ...state,
                roadmap: action.roadmap,
            };
        default:
            return state;
    }
};

const roadmap = (state = { data: [] }, action) => {
    switch (action.type) {
        case 'LIVE_ROADMAP':
            return {
                ...state,
                data: action.roadmap,
            };
        default: return state;
    }
}

export default combineReducers({
    routes,
    roadmap
});