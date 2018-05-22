import initialState from './initState';

const map = (state = initialState.geoFences, action) => {
  switch (action.type) {
    case "FETCH_GEO_FENCES":
      const ids = Object.keys(action.payload);
      const byId = ids.reduce((data, geoFenceId) => {
        data[geoFenceId] = {
          ...action.payload[geoFenceId],
          visible: true,
        };
        return data;
      }, {});
      return { ...state, ids, byId };
    case "ADD_GEO_FENCE":
      const { id, geoFence } = action.payload;
      return {
        ...state,
        ids: [...state.ids, id ],
        byId: {
          ...state.byId,
          [id]: { ...geoFence, visible: true },
        },
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
    case "DELETE_GEO_FENCE": {
      const { [action.payload]: remove, ...byId } = state.byId;
      const ids = state.ids.filter(id => id !== action.payload);
      return {
        ...state,
        ids,
        byId,
      };
    }
    case "PRINT_VEHICLE_GEO_FENCES":
      return {
        ...state,
        data: action.payload
      };
    case "CLEAR_VEHICLE_GEO_FENCES":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload]: undefined,
        }
      };
    case "CLEAR_VEHICLE_GEO_FENCES_ALL":
      return {
        ...state,
        data: undefined,
      };
    default:
      return state;
  }
};

export default map;