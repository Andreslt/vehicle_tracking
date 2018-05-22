import fB from './firebase';
import axios from 'axios';
import FileDownload from 'react-file-download';
import moment from 'moment';

const limitToLast = 100; // Controlling the amount of trails

/* >>>> USERS <<<< */
export const setCurrentUser = currentUser => {
  return async dispatch => {
    dispatch({
      type: "SET_CURRENT_USER",
      payload: currentUser
    });
    dispatch({
      type: "SET_CURRENT_COMPANY",
      payload: currentUser.company
    });
  };
};

/* >>>> ZONES <<<< */
export const fetchZones = currentCompany => {
  return async dispatch => {
    fB.child('CONTROL/ZONES').orderByChild('company').equalTo(currentCompany).on('value', snap => {
      dispatch({
        type: "FETCH_ZONES",
        payload: snap.val()
      });
    });
  };
};

export const setCurrentZone = currentZone => {
  return async dispatch => {
    dispatch({
      type: "SET_CURRENT_ZONE",
      payload: currentZone
    });
  };
};

export const printZoneKml = (mapProps) => {
  return async dispatch => {
    dispatch({
      type: 'PRINT_ZONE_KML',
      payload: mapProps.kml
    });
  };
};

export const clearZoneKml = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_ZONE_KML',
      payload: ''
    });
  };
};

/* >>>> VEHICLES <<<< */
export const fetchVehicles = currentZone => {
  return async dispatch => {
    fB.child('CONTROL/VEHICLES').orderByChild('zone').equalTo(currentZone.id).on('value', snap => {
      dispatch({
        type: "FETCH_VEHICLES",
        payload: snap.val()
      });
    });
  };
};

export const currentVehicle = (vehicleId) => {
  const vehId = vehicleId.split('_')[1];
  return async dispatch => {
    fB.child('CONTROL/VEHICLES').orderByChild('id').equalTo(vehId).on('value', snap => {
      dispatch({
        type: "CURRENT_VEHICLE",
        payload: {
          data: Object.values(snap.val())[0],
        }
      });
      dispatch({
        type: "VEHICLE_INFO",
        payload: true
      });
      dispatch({
        type: "TRAIL_CSV_DATA_LOADING",
        payload: false
      });
    });
  };
};

export const vehicleInfo = (state) => {
  return async dispatch => {
    dispatch({
      type: "VEHICLE_INFO",
      payload: state
    });
  };
};

export const vehicleSnapshot = (state) => {
  return async dispatch => {
    dispatch({
      type: "VEHICLE_SNAP_VIDEO",
      payload: state
    });
  };
};

/* >>>> TRAILS <<<< */
export const setTrackingMode = mode => {
  return async dispatch => {
    dispatch({
      type: "SET_TRACKING_MODE",
      payload: mode
    });
  };
};

export const printTrail = vehicle => {
  const company = vehicle.zone.split('_')[0];// this code should ALWAYS be 5 characters long.
  const path = `DATA/ENTITIES/${company}/ZONES/${vehicle.zone}/VEHICLES/${vehicle.id}`;
  return async (dispatch, getState) => {
    fB.child(`${path}/TRAILS`).limitToLast(limitToLast).on('value', snap => {
      const data = getState().trails.data;
      const snapValObj = Object.values(snap.val());
      snapValObj.sort(compare);
      dispatch({
        type: "PRINT_VEHICLE_TRAIL",
        payload: {
          ...data,
          [vehicle.id]: snapValObj
        }
      });
    });
    const endingDate = moment().format();
    const startingDate = moment().subtract(3, 'd').format();
    fB.child(`${path}/GEO_FENCES`).orderByChild('timestamp').startAt(startingDate).endAt(endingDate).on('value', snap => {
      const data = getState().geoFences.data;
      dispatch({
        type: "PRINT_VEHICLE_GEO_FENCES",
        payload: {
          ...data,
          [vehicle.id]: snap.val()
        }
      });
    });
  };
};

export const clearTrail = (vehicle, mode) => {
  const company = vehicle.zone.split('_')[0]; // this code should ALWAYS be 5 characters long.
  const path = `DATA/ENTITIES/${company}/ZONES/${vehicle.zone}/VEHICLES/${vehicle.id}`;
  return async (dispatch, getState) => {
    const refTrails = fB.child(`${path}/TRAILS`).limitToLast(limitToLast);
    refTrails.off('value', null);
    const refGeoFences = fB.child(`${path}/GEO_FENCES`);
    refGeoFences.off('value', null);
    let trails = getState().trails;
    if (mode === 'none') {
      !!trails.data && delete trails.data;
    } else {
      !!trails.data && delete trails.data[vehicle.id];
    }
    dispatch({
      type: "CLEAR_VEHICLE_TRAIL",
      payload: trails.data,
    });
    dispatch({
      type: "CLEAR_VEHICLE_GEO_FENCES",
      payload: vehicle.id,
    });
  }
};

export const clearAllTrails = () => {
  return async (dispatch, getState) => {
    let trails = getState().trails;
    delete trails.data;
    dispatch({
      type: "CLEAR_VEHICLE_TRAIL",
      payload: trails.data
    });
    dispatch({ type: "CLEAR_VEHICLE_GEO_FENCES_ALL" });
  }
};

export const printRoute = (vehicle, startingDate, endingDate) => {
  const company = vehicle.zone.slice(0, 5); // this code should ALWAYS be 5 characters long.
  const path = `DATA/ENTITIES/${company}/ZONES/${vehicle.zone}/VEHICLES/${vehicle.id}/TRAILS`;
  return async dispatch => {
    fB.child(path).orderByChild('sent_tsmp').startAt(startingDate).endAt(endingDate).on('value', snap => {
      const snapValObj = Object.values(snap.val());
      snapValObj.sort(compare);      
      dispatch({
        type: "PRINT_VEHICLE_ROUTE",
        payload: snapValObj
      });
    });
  };
};

export const clearRoute = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_VEHICLE_ROUTE"
    });
  };
};

export const exportTrailCSV = (vehicle, startingDate, endingDate) => {
  const data = {
    vehicle,
    startingDate,
    endingDate
  };
  const serverhost = ['http://ec2-13-58-10-199.us-east-2.compute.amazonaws.com:8080', 'http://localhost:8080'];
  const env = 0; // 0: prod, 1: local
  return async dispatch => {
    dispatch({
      type: "TRAIL_CSV_DATA_LOADING",
      payload: true
    });
    try {
      const response = await (axios.post(`${serverhost[env]}/api/downloadcsv`, data));
      const fileName = `smt_${vehicle.zone}_${vehicle.id}-${moment().format()}.csv`;
      FileDownload(response.data, fileName);
      dispatch({
        type: "TRAIL_CSV_DATA_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "TRAIL_CSV_DATA_FAIL",
      });
    }
    dispatch({
      type: "TRAIL_CSV_DATA_LOADING",
      payload: false
    });
  };
};

export const changeMapMode = mode => dispatch => {
  if (mode === "geoFences") {
    dispatch(fetchGeoFences());
  }
  return dispatch({
    type: "CHANGE_MAP_MODE",
    payload: mode
  });
};

/* >>>> GEO FENCES <<<< */
export const fetchGeoFences = () => async (dispatch, getState) => {
  const { companies: { currentCompany } } = getState();
  // TODO change once to on but fix adding to avoid duplicate error
  fB.child(`CONTROL/GEO_FENCES/${currentCompany}`).once('value', snap => {
    dispatch({
      type: "FETCH_GEO_FENCES",
      payload: snap.val() || {},
    });
  });
};

export const addGeoFence = geoFence => async (dispatch, getState) => {
  const { companies: { currentCompany }, users: { currentUser } } = getState();
  const newGeoFenceId = fB.child(`CONTROL/GEO_FENCES/${currentCompany}`).push().key;
  geoFence = {
    ...geoFence,
    uid: currentUser.uid,
    created_at: new Date(),
  };
  fB.update({
    [`CONTROL/GEO_FENCES/${currentCompany}/${newGeoFenceId}`]: geoFence,
  });
  return dispatch({
    type: "ADD_GEO_FENCE",
    payload: {
      id: newGeoFenceId,
      geoFence,
    },
  });
};

export const changeGeoFenceVisibility = (geoFenceId, visible) => ({
  type: "CHANGE_GEO_FENCE_VISIBILITY",
  payload: {
    id: geoFenceId,
    visible,
  },
});

export const deleteGeoFence = geoFenceId => async (dispatch, getState) => {
  const { companies: { currentCompany } } = getState();
  fB.child(`CONTROL/GEO_FENCES/${currentCompany}/${geoFenceId}`).remove();
  return dispatch({
    type: "DELETE_GEO_FENCE",
    payload: geoFenceId
  });
};

function compare(a, b) {
  const aDate = new Date (a.sent_tsmp);
  const bDate = new Date (b.sent_tsmp);
  if (aDate < bDate)
    return -1;
  if (aDate > bDate)
    return 1;
  return 0;
}
