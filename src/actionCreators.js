import axios from 'axios';
// import { watcher, fire } from './firebase-client'

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
      mapProps: route.mapProps,
      currentRoute: route.id
    })
  };
}

const liveRoadmap = (route) => {
  return async dispatch => {
    const response = await(axios.get(`http://localhost:8000/roadmap/${route}`));
    dispatch({
      type: "LIVE_ROADMAP",
      roadmap: response.data
    })
  };
}


export { fetchRoutes, printRoute, liveRoadmap };