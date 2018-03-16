import initialState from './initState';

export default (state = initialState.trailsReducer, action) => {
  switch (action.type) {
    case 'PRINT_ROUTE_TRAIL': return action.payload;
    default: return state;
  }
}