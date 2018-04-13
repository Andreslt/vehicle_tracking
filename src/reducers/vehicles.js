import initialState from './initState';

export default (state = initialState.vehicles, action) => {
  switch (action.type) {
    case 'FETCH_VEHICLES':
      return {
        ...state,
        data: action.payload
      };
    default: return state;
  }
  switch (action.type) {
    case 'REQUEST_VEHICLE_SNAPSHOT':
      return {
        ...state,
        data: action.payload
      };
    default: return state;
  }  
  switch (action.type) {
    case 'REQUEST_VEHICLE_VIDEO':
      return {
        ...state,
        data: action.payload
      };
    default: return state;
  }  
}