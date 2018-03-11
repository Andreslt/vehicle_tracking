import axios from 'axios';

const fetchRoutes = () => {
  return async dispatch => {
    const response = await(axios.get('http://localhost:3001/routes'));
    dispatch({
      type: "FETCH_ROUTES",
      routes: response.data
    })
  };
}

const printRoute = (route) => {
  return async dispatch => {
    dispatch({
      type: "PRINT_ROUTE",
      mapProps: route.mapProps
    })
  };
}

export { fetchRoutes, printRoute };