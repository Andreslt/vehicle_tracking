import initialState from './initState';

export default (state = initialState.clients, action) => {
  switch (action.type) {
    case 'FETCH_CLIENTS':
      return {
        ...state,
        data: action.payload
      };
      case 'GET_CLIENT_INFO':
      return {
        ...state,
        clientInfo: action.payload
      };      
    default: return state;
  }
}