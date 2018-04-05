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
}