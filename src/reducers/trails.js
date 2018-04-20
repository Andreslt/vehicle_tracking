import initialState from './initState';

export default (state = initialState.trails, action) => {
  switch (action.type) {
    case 'PRINT_VEHICLE_TRAIL':
      return {
        ...state,
        data: action.payload
      };
      case 'CLEAR_VEHICLE_TRAIL':
      return {
        ...state,
        data: action.payload
      };     
      case 'MULTI_TRACKING':
      return {
        ...state,
        multiTrackingMode: action.payload
      };           
      case 'TRAIL_CSV_DATA_LOADING':
      return {
        ...state,
        csvLoading: action.payload,
        csvData: false,
        csvDataError: false
      };           
      case 'TRAIL_CSV_DATA_SUCCESS':
      return {
        ...state,
        csvData: true
      };           
      case 'TRAIL_CSV_DATA_FAIL':
      return {
        ...state,
        csvData: false,
        csvDataError: true
      };           
    default: return state;
  }
}