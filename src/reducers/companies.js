import initialState from './initState';

const company = (state = initialState.company, action) => {
  switch (action.type) {
    case "SET_CURRENT_COMPANY":
      return {
        ...state,
        currentCompany: action.payload
      };
    default:
      return state;
  }
};

export default company;