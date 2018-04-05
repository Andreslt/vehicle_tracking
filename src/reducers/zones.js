import initialState from './initState';

export default (state = initialState.zones, action) => {
  switch (action.type) {
    case 'FETCH_ZONES':
      return {
        ...state,
        data: action.payload
      };
    case 'PRINT_ZONE_KML':
    console.log('action.payload -- ', action.payload)
      return {
        ...state,
        currentZone: action.payload
      }
    case 'CLEAR_ZONE_KML':
      return {
        ...state,
        currentZone: action.payload
      }
    default: return state;
  }
}