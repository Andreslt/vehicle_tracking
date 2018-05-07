import initialState from './initState';

const map = (state = initialState.map, action) => {
  switch (action.type) {
    case "CHANGE_MAP_MODE":
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
};

export default map;