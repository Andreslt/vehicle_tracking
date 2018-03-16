import initialState from './initState';

export default (state = initialState.routesReducer, action) => {
  switch (action.type) {
    case 'FETCH_ROUTES':
      return {
        ...state,
        data: action.payload
      };
    case 'PRINT_ROUTE':
      return {
        ...state,
        map: action.payload.map
      }
    case 'PRINT_ROUTE_TRAIL':
      return {
        ...state,
        trails: action.payload
      }
      case 'RESET_ROUTE_TRAIL':
      return {
        ...state,
        trails: ''
      }      
    default: return state;
  }
}