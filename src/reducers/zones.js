import initialState from './initState';

export default (state = initialState.zones, action) => {
  switch (action.type) {
    case 'FETCH_ZONES':
      return {
        ...state,
        data: action.payload
      };
    case 'SET_CURRENT_ZONE':
      return {
        ...state,
        currentZone: action.payload
      }
    case 'PRINT_ZONE_KML':
      return {
        ...state,
        drawnKML: action.payload
      }
    case 'CLEAR_ZONE_KML':
      return {
        ...state,
        drawnKML: action.payload
      }
    default: return state;
  }
}