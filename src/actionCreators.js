import fB from './firebase';

export const fetchRoutes = () => {
  return async dispatch => {
    fB.child('routes').on('value', snap => {
      dispatch({
        type: "FETCH_ROUTES",
        payload: snap.val()
      })
    })
  };
}

export const printRoute = (route) => {
  return async dispatch => {
    dispatch({
      type: "PRINT_ROUTE",
      payload: {
        map: route.mapProps,
        currentRoute: route.id
      }
    })
  };
}

export const printRouteTrail = () => {
  return dispatch => {
    fB.child('trails').on('value', snap => {
      dispatch({
        type: "PRINT_ROUTE_TRAIL",
        payload: snap.val()
      })
    })
  }
}