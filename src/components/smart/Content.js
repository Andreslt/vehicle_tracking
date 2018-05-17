import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Map from '../dump/Map';
import { addGeoFence } from '../../actionCreators';

class ContentContainer extends Component {
  render() {
    const { mapMode } = this.props;
    if (mapMode === "history") {
      return (
        <div>{JSON.stringify(this.props.geoFences.data)}</div>
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
});

const mapDispatchToProps = dispatch => ({
  addGeoFence: bindActionCreators(addGeoFence, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);