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
        currentVehicle: action.payload,
      };
    case 'VEHICLE_INFO':
    console.log('*** state -> ', state);
      return {
        ...state,
        vehicleInfo: action.payload,
      };
    case 'VEHICLE_SNAP_VIDEO':
      return {
        ...state,
        liveRecording: action.payload
      };
    default: return state;
  }
}