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
  vehicleSnapshot,
  changeMapMode,
  changeGeoFenceVisibility,
} from '../../actionCreators';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import List from "material-ui/List";
import theme from '../../app/theme.json';
import { withStyles } from 'material-ui/styles';
import { compose } from "recompose";

import BottomNavigation from '../dump/Sidebar/BottomNavigation';
import VehicleList from '../dump/Sidebar/VehicleList';
import ZoneItem from '../dump/Sidebar/ZoneItem';
import GeoFenceItem from '../dump/Sidebar/GeoFenceItem';

const layout = theme.layout;
const themeSelector = 0; // 0: Light, 1: Dark
let checkArray = {};

export const styles = theme => ({
  tabWrapper: {
    'nav': {
      display: 'flex',
      flexDirection: 'row'
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
  },
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
    geoFenceFilter: "",
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
    if (Object.keys(checkArray).length === 0) {
      // SINGLE MODE - FIRST TIME CHECKING
      this.props.printTrail(zoneId, this.props.vehicles[vehicleId].id, false);
      checkArray[index] = true;
    } else {
      if (checkArray[index]) {
        // UNCHECKING
        let allowBlank;

        allowBlank = Object.keys(checkArray).length === 1;

        delete checkArray[index];
        this.props.multiTrackingOrInitMode(allowBlank);
        this.props.clearTrail(zoneId, this.props.vehicles[vehicleId].id, allowBlank);
      } else {
        // MULTI TRACKING MODE

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
    this.props.changeMapMode(value);
  };

  handleGeoFenceVisibilityChange = geoFenceId => ({ target: { checked } }) => this.props.changeGeoFenceVisibility(geoFenceId, checked);

  handleGeoFenceFilter = ({ target: { value } }) => this.setState({ geoFenceFilter: value });

  getTabTitle = mode => {
    switch (mode) {
      case "geoFences":
        return "Geo-Fences";
      case "recent":
      default:
        return "Zonas";
    }
  };

  getCardContent = mode => {
    switch (mode) {
      case "geoFences":
        if (this.props.geoFences) {
          let {ids, byId} = this.props.geoFences;
          if (this.state.geoFenceFilter) {
            ids = ids.filter(id => byId[id].name.toLowerCase().includes(this.state.geoFenceFilter.toLowerCase()));
          }
          return ids.map(geoFenceId => (
            <GeoFenceItem
              key={geoFenceId}
              geoFence={byId[geoFenceId]}
              onChange={this.handleGeoFenceVisibilityChange(geoFenceId)}
            />
          ));
        }
        return [];
      case "recent":
      default:
        if (this.props.zones) {
          return Object.keys(this.props.zones).map((zoneKey, index) => (
            <ZoneItem
              key={`div${index}`}
              zoneKey={zoneKey}
              zone={this.props.zones[zoneKey]}
              isExpanded={this.state.open && this.state.colKey === zoneKey}
              zonePicked={this.state.zonePicked}
              selectedSubZone={this.state.selectedSubzone}
              kmlEmptyError={this.state.kmlEmptyError}
              vehicleList={
                <VehicleList
                  vehicles={this.props.vehicles}
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
              onToggleSwitch={this.handleSwitch(this.props.zones[zoneKey])}
            />
          ))
        }
        return [];
    }
  };

  render() {
    const { classes, mapMode } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Card style={cssStyles.card}>
          <Tabs width="auto" value={0} style={cssStyles.tabs}>
            <Tab
              label={this.getTabTitle(mapMode)}
              style={cssStyles.singleTab}
              className={classes.tabWrapper}
            />
          </Tabs>
          <CardContent style={cssStyles.cardContent}>
            {mapMode === "geoFences" && (
              <TextField
                margin="normal"
                className={classes.textField}
                label="Filtrar"
                value={this.state.geoFenceFilter}
                onChange={this.handleGeoFenceFilter}
              />
            )}
            <List component="nav" style={cssStyles.list}>
              {this.getCardContent(mapMode)}
            </List>
          </CardContent>
        </Card>
        <div>
          <Divider />
          <BottomNavigation
            onChange={this.handleTabChange}
            selectedTab={mapMode}
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
    mapMode: state.map.mode,
    geoFences: state.geoFences,
  }
};

const mapDispatchToProps = dispatch => ({
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
  },
  changeMapMode(mode) {
    dispatch(changeMapMode(mode))
  },
  changeGeoFenceVisibility(id, visible) {
    dispatch(changeGeoFenceVisibility(id, visible));
  },
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SidebarContainer)
