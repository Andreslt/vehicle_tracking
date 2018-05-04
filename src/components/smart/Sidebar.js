import React, { Component } from 'react';
import {
  fetchZones,
  printZoneKml,
  clearZoneKml,
  fetchVehicles,
  printTrail,
  clearTrail,
  multiTrackingMode,
  currentVehicle,
  vehicleInfo,
  vehicleSnapshot
} from '../../actionCreators';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardContent } from 'material-ui/Card';
import { Divider  } from 'material-ui';
import List from "material-ui/List";
import theme from '../../app/theme.json';
import { withStyles } from 'material-ui/styles';
import { compose } from "recompose";

import BottomNavigation from '../dump/Sidebar/BottomNavigation';
import VehicleList from '../dump/Sidebar/VehicleList';
import ZoneItem from '../dump/Sidebar/ZoneItem';

const layout = theme.layout;
const themeSelector = 0; // 0: Light, 1: Dark
let checkArray = {};

export const styles = () => ({
  tabWrapper: {
    'nav': {
      display: 'flex',
      flexDirection: 'row'
    }
  },
});

const cssStyles = {
  card: {
    maxWidth: 345,
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  cardHeader: {
    background: "#1394ff",
    height: "2.5em",
    color: 'white'
  },
  cardContent: {
    maxHeight: "35em",
    overflow: 'auto',
    padding: 0,
  },
  tabs: {
    background: '#eaedf0'
  },
  singleTab: {
    maxWidth: '-webkit-fill-available',
    flexGrow: 1,
    color: "#515253",
    boxShadow: "0 1px 0 0 rgba(0,0,0,.1), 2px 5px 5px 0 rgba(0,0,0,.05)",
    height: '47px'
  },
  list: {
    padding: 0,
    width: '100%',
    maxWidth: 360,
  },
  ListSubheader: {
    color: layout[themeSelector].fontColor,
    float: 'left',
    fontSize: "medium"
  },
  ListItem: {
    padding: 5,
  },
  cardBottom: {
    background: layout[themeSelector].cardBottom.background,
    margin: "0",
    paddin: "20",
    color: "white"
  },
  iconColor: {
    default: layout[themeSelector].cardBottom.color,
    selected: layout[themeSelector].cardBottom.selected
  }
};

class SidebarContainer extends Component {
  state = {
    open: false,
    colKey: 0,
    vehicles: {},
    switch: false,
    checked: false,
    zonePicked: null,
    selectedSubzone: '',
    multiTrackingMode: false,
    hooverVehicle: '',
    kmlEmptyError: false,
    selectedTab: "recent",
  };

  componentDidMount() {
    this.props.fetchZones();
  }

  handleClick = (zoneId) => () => {
    if (!this.state.open) {
      this.props.fetchVehicles(zoneId);
      this.props.clearZoneKml(this.props.zones[zoneId]);
      this.setState({ open: true, colKey: zoneId, switch: false, zonePicked: this.props.zones[zoneId], kmlEmptyError: false });
    } else this.setState({ open: false });
  };

  handleCheck = (zoneId, vehicleId, index) => () => {
    if (Object.keys(checkArray).length === 0) { // SINGLE MODE - FIRST TIME CHECKING
      this.props.printTrail(zoneId, this.props.vehicles[vehicleId].id, false);
      checkArray[index] = true;
    } else {
      if (checkArray[index]) { // UNCHECKING
        let allowBlank;

        allowBlank = Object.keys(checkArray).length === 1;

        delete checkArray[index];
        this.props.multiTrackingOrInitMode(allowBlank);
        this.props.clearTrail(zoneId, this.props.vehicles[vehicleId].id, allowBlank);
      } else { // MULTI TRACKING MODE

        checkArray[index] = true;
        this.props.printTrail(zoneId, this.props.vehicles[vehicleId].id);
        this.props.multiTrackingOrInitMode(true);
      }
    }
  };

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.switch) {
      const zone = this.state.zonePicked;
      const subzone = zone.subzones[event.target.value];
      this.props.clearZoneKml(zone);
      this.props.printZoneKml(subzone)
    }
  };

  handleSwitch = zone => () => {
    const subzone = zone.subzones[this.state.selectedSubzone];
    if (!this.state.switch) {
      if (subzone.mapProps) {
        this.props.printZoneKml(subzone);
        this.setState({ switch: !this.state.switch, kmlEmptyError: false })
      } else {
        this.setState({ switch: !this.state.switch, kmlEmptyError: true })
      }
    } else {
      this.props.clearZoneKml(zone);
      this.setState({ switch: !this.state.switch, kmlEmptyError: false })
    }
  };

  handleMouseHover = (type, vehicle) => () => {
    this.setState({ hooverVehicle: (type) ? vehicle : '' });
  };

  handlePanel = (zoneId, vehicleId) => () => {
    this.props.currentVehicle(zoneId, vehicleId);
  };

  handleModal = vehicleId => () => {
    this.props.vehicleSnapshot(true);
  };

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const { zones, vehicles, classes } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Card style={cssStyles.card}>
          <Tabs width="auto" value={0} style={cssStyles.tabs}>
            <Tab
              label={`Zonas`}
              style={cssStyles.singleTab}
              className={classes.tabWrapper}
            />
          </Tabs>
          <CardContent style={cssStyles.cardContent}>
            <List component="nav" style={cssStyles.list}>
              {zones &&
                Object.keys(zones).map((zoneKey, index) => (
                  <ZoneItem
                    key={`div${index}`}
                    zoneKey={zoneKey}
                    zone={zones[zoneKey]}
                    isExpanded={this.state.open && this.state.colKey === zoneKey}
                    zonePicked={this.state.zonePicked}
                    selectedSubZone={this.state.selectedSubzone}
                    kmlEmptyError={this.state.kmlEmptyError}
                    vehicleList={
                      <VehicleList
                        vehicles={vehicles}
                        zoneKey={zoneKey}
                        hooverVehicle={this.state.hooverVehicle}
                        trails={this.props.trails}
                        onMouseHoverItem={this.handleMouseHover}
                        onCheckItem={this.handleCheck}
                        onOpenModal={this.handleModal}
                        onOpenPanel={this.handlePanel}
                      />
                    }
                    onZoneClick={this.handleClick(zoneKey)}
                    onSubZoneSelect={this.handleSelect}
                    onToggleSwitch={this.handleSwitch(zones[zoneKey])}
                  />
                ))}
            </List>
          </CardContent>
        </Card>
        <div>
          <Divider />
          <BottomNavigation
            onChange={this.handleTabChange}
            selectedTab={this.state.selectedTab}
            rootStyle={cssStyles.cardBottom}
            iconColors={cssStyles.iconColor}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    zones: state.zones.data,
    vehicles: state.vehicles.data,
    trails: state.trails.data,
    multiTrackingMode: state.trails.mode,
    vehicleInfo: state.vehicles.vehicleInfo,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchZones() {
      dispatch(fetchZones());
    },
    fetchVehicles(zone) {
      dispatch(fetchVehicles(zone));
    },
    printZoneKml(zone) {
      dispatch(clearZoneKml(zone));
      dispatch(printZoneKml(zone));
    },
    clearZoneKml(zone) {
      dispatch(clearZoneKml(zone));
    },
    printTrail(zoneId, vehicleId) {
      dispatch(printTrail(zoneId, vehicleId));
    },
    clearTrail(zoneId, vehicleId, blank) {
      dispatch(clearTrail(zoneId, vehicleId, blank));
    },
    multiTrackingOrInitMode(status) {
      dispatch(multiTrackingMode(status))
    },
    currentVehicle(zoneId, vehicleId) {
      dispatch(currentVehicle(zoneId, vehicleId))
    },
    vehicleInfo(state) {
      console.log('Llegó a vehicleInfo 1');
      dispatch(vehicleInfo(state))
    },
    vehicleSnapshot(vehicleId) {
      dispatch(vehicleSnapshot(vehicleId))
    }
  }
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SidebarContainer)
