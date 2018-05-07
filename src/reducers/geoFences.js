import initialState from './initState';

const map = (state = initialState.geoFences, action) => {
  switch (action.type) {
    case "ADD_GEO_FENCE":
      return {
        ...state,
        ids: [
          ...state.ids,
          state.length
        ],
        byId: {
          ...state.byId,
          [state.length]: action.payload,
        },
        length: state.length + 1,
      };
    case "CHANGE_GEO_FENCE_VISIBILITY":
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            visible: action.payload.visible,
          },
        },
      };
    default:
      return state;
  }
};

export default map;