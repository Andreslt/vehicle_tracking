import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Map from '../dump/Map';
import Chart from '../dump/Chart';
import { addGeoFence, deleteGeoFence } from '../../actionCreators';

class ContentContainer extends Component {
  render() {
    const { mapMode } = this.props;
    if (mapMode === "history") {
      return (
        <Chart data={this.props.geoFences.data} />
      );
    }
    return (
      <Map {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  // map: state.zones.currentZone.mapProps,
  // multiTrackingMode: state.trails.multiTrackingMode,
  // followTrail: state.trails.followTrail,
  // currentVehicle: state.vehicles.currentVehicle,
  currentZone: state.zones.currentZone,
  trails: state.trails,
  drawnKML: state.zones.drawnKML,
  mapMode: state.map.mode,
  geoFences: state.geoFences,
  currentUserUID: state.users.currentUser.uid
});

const mapDispatchToProps = dispatch => ({
  addGeoFence: bindActionCreators(addGeoFence, dispatch),
  deleteGeoFence: bindActionCreators(deleteGeoFence, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);