import fB from './firebase';

/* >>>> ZONES <<<< */
export const fetchZones = () => {
  return async dispatch => {
    fB.child('zones').on('value', snap => {
      console.log('snap.val() -> ', snap.val())
      dispatch({
        type: "FETCH_ZONES",
        payload: snap.val()
      })
    })
  };
}

export const printZoneKml = (zone)=> {
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

/* >>>> TRAILS <<<< */
export const printTrail = (zoneId, vehicleId) => {
  const zone_vehicle = `${zoneId}_${vehicleId}`
  return dispatch => {
    fB.child('trails').orderByChild('zone_vehicle').equalTo(zone_vehicle).on('value', snap => {
      dispatch({
        type: "PRINT_VEHICLE_TRAIL",
        payload: snap.val()
      })
    })
  }
}

export const clearTrail = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_VEHICLE_TRAIL"
    })
  }
}