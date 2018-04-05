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
        data: ''
      };      
    default: return state;
  }
}