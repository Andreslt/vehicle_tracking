import fB from './firebase';
import axios from 'axios';
import FileDownload from 'react-file-download';
import moment from 'moment';

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

export const currentVehicle = (zoneId, vehicleId) => {
  return async dispatch => {
    fB.child('vehicles').on('value', snap => {
      dispatch({
        type: "CURRENT_VEHICLE",
        payload: {
          data: snap.val()[vehicleId],
          zoneId
        }
      })
      dispatch({
        type: "VEHICLE_INFO",
        payload: true
      })
      dispatch({
        type: "TRAIL_CSV_DATA_LOADING",
        payload: false
      })
    })
  }
}

export const vehicleInfo = (state) => {
  return async dispatch => {
    dispatch({
      type: "VEHICLE_INFO",
      payload: state
    })
  }
}

export const vehicleSnapshot = (state) => {
  return async dispatch => {
    dispatch({
      type: "VEHICLE_SNAP_VIDEO",
      payload: state
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

export const exportTrailCSV = (zoneId, vehicleId, startingDate, endingDate) => {
  const data = {
    startingDate,
    endingDate
  };
  const serverhost = ['http://ec2-13-58-10-199.us-east-2.compute.amazonaws.com:8080', 'http://localhost:8080'];
  const env = 0 // 0: prod, 1: local
  return async dispatch => {
    dispatch({
      type: "TRAIL_CSV_DATA_LOADING",
      payload: true
    })
    try {
      const time1 = moment(new Date());
      // console.log('*** time 1 -> ', time1.format('DD/MM HH:mm:ss'));
      const response = await (axios.post(`${serverhost[env]}/api/downloadcsv`, data));
      const time2 = moment(new Date());
      // console.log('*** time 2 -> ', time2.format('DD/MM HH:mm:ss'), '.:. Diff ->', moment(time2.diff(time1)).format("m[m] s[s]"));
      
      const fileName = `smt_${zoneId}_${vehicleId}-${moment().format()}.csv`
      FileDownload(response.data, fileName);
      dispatch({
        type: "TRAIL_CSV_DATA_SUCCESS",
      })
      const time3 = moment(new Date());
      // console.log('*** time 3 -> ', time3.format('DD/MM HH:mm:ss'), '.:. Diff ->', moment(time3.diff(time2)).format("m[m] s[s]"));
    } catch (error) {
      dispatch({
        type: "TRAIL_CSV_DATA_FAIL",
      })
    }
    dispatch({
      type: "TRAIL_CSV_DATA_LOADING",
      payload: false
    })
  };

  const zone_vehicle = `${zoneId}_${vehicleId}`;
  return (dispatch) => {
    fB.child('trails').orderByChild('sent_tsmp').startAt(startingDate).endAt(endingDate)
      .on('value', snap => {
        dispatch({
          type: "TRAIL_CSV_DATA",
          payload: snap.val()
        })
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