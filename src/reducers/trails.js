import initialState from './initState';

export default (state = initialState.trails, action) => {
  switch (action.type) {
    case 'PRINT_VEHICLE_TRAIL':
      return {
        ...state,
        data: action.payload
      };
      case 'CLEAR_VEHICLE_TRAIL':
      return {
        ...state,
        data: action.payload
      };     
      case 'MULTI_TRACKING':
      return {
        ...state,
        multiTrackingMode: action.payload
      };           
    default: return state;
  }
}