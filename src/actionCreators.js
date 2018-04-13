import fB from './firebase';

const limitToLast = 100; // Controlling the amount of trails

/* >>>> CLIENTS <<<< */
export const fetchClients = () => {
  return async dispatch => {
    fB.child('clients').on('value', snap => {
      dispatch({
        type: "FETCH_CLIENTS",
        payload: snap.val()
      })
    })
  };
}

export const getClientInfo = (clientId) => {
  return async dispatch => {
    fB.child('clients').orderByChild('client_id').equalTo(clientId).on('value', snap => {
      dispatch({
        type: "GET_CLIENT_INFO",
        payload: snap.val()
      })
    })
  };
}

/* >>>> ZONES <<<< */
export const fetchZones = () => {
  return async dispatch => {
    // fB.child('trails').remove();
    fB.child('zones').on('value', snap => {
      dispatch({
        type: "FETCH_ZONES",
        payload: snap.val()
      })
    })
  };
}

export const printZoneKml = (zone) => {
  return async dispatch => {
    dispatch({
      type: 'PRINT_ZONE_KML',
      payload: zone
    })
  }
}

export const clearZoneKml = (zone) => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_ZONE_KML',
      payload: {
        mapProps: {
          latitude: zone.mapProps.latitude,
          longitude: zone.mapProps.longitude,
          zoom: zone.mapProps.zoom,
          kml: ''
        }
      }
    })
  }
}

/* >>>> VEHICLES <<<< */
export const fetchVehicles = (zone) => {
  return async dispatch => {
    fB.child('vehicles').orderByChild('zone_id').equalTo(zone).on('value', snap => {
      dispatch({
        type: "FETCH_VEHICLES",
        payload: snap.val()
      })
    })
  };
}

export const reqVehicleSnapshot = (clientId) => {
  return async dispatch => {
    fB.child('vehicles').orderByChild('zone_id').equalTo(clientId).on('value', snap => {
      dispatch({
        type: "REQUEST_VEHICLE_SNAPSHOT",
        payload: snap.val()
      })
    })
  };
}

export const reqVehicleVideo = (clientId) => {
  return async dispatch => {
    fB.child('vehicles').orderByChild('client').equalTo(clientId).on('value', snap => {
      dispatch({
        type: "REQUEST_VEHICLE_VIDEO",
        payload: snap.val()
      })
    })
  };
}

/* >>>> TRAILS <<<< */
export const printTrail = (zoneId, vehicleId) => {
  const zone_vehicle = `${zoneId}_${vehicleId}`;
  return (dispatch, getState) => {
    fB.child('trails').orderByChild('zone_vehicle').equalTo(zone_vehicle).limitToLast(limitToLast).on('value', snap => {
      const data = getState().trails.data;
      dispatch({
        type: "PRINT_VEHICLE_TRAIL",
        payload: {
          ...data,
          [zone_vehicle]: snap.val()
        }
      })
    })
  }
}

export const clearTrail = (zoneId, vehicleId, blank) => {
  const zone_vehicle = `${zoneId}_${vehicleId}`;
  const ref = fB.child('trails').orderByChild('zone_vehicle').equalTo(zone_vehicle).limitToLast(limitToLast);
  ref.off('value', null);
  return (dispatch, getState) => {
    let data = getState().trails.data;
    delete data[zone_vehicle]; // Deleting data of zone_vehicle
    dispatch({
      type: "CLEAR_VEHICLE_TRAIL",
      payload: { ...data }
    })
  }
}

export const multiTrackingMode = (status) => {
  return dispatch => {
    dispatch({
      type: "MULTI_TRACKING",
      payload: status
    })
  }
}