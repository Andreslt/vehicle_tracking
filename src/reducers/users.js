import initialState from './initState';

export default (state = initialState.userInfo, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    default: return state;
  }
}