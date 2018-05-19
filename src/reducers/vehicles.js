import initialState from './initState';

export default (state = initialState.vehicles, action) => {
  switch (action.type) {
    case 'FETCH_VEHICLES':
      return {
        ...state,
        data: action.payload
      };
    case 'CURRENT_VEHICLE':
      return {
        ...state,
        currentVehicle: action.payload.data,
        vehicleZoneId: action.payload.zoneId
      };
    case 'VEHICLE_INFO':
      return {
        ...state,
        vehicleInfo: action.payload,
      };
    case 'VEHICLE_SNAP_VIDEO':
      return {
        ...state,
        liveRecording: action.payload
      };
    case 'PRINT_VEHICLE_ROUTE':
      return {
        ...state,
        printedRoute: true,
        routeTrails: action.payload
      };
    case 'CLEAR_VEHICLE_ROUTE':
      return {
        ...state,
        printedRoute: false,
        routeTrails: null
      };
    default: return state;
  }
}