import initialState from './initState';

export default (state = initialState.userInfo, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: action.payload
      };
    default: return state;
  }
}