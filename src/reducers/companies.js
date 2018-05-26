import initialState from './initState';

const company = (state = initialState.company, action) => {
  switch (action.type) {
    case "SET_CURRENT_COMPANY":
      return {
        ...state,
        currentCompany: action.payload
      };
    case "FETCH_COMPANIES":
      const byId = action.payload;
      return {
        ...state,
        byId,
        ids: Object.keys(byId),
      };
    default:
      return state;
  }
};

export default company;