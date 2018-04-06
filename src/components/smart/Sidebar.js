import React, { Component } from 'react';
import {
  fetchZones,
  printZoneKml,
  clearZoneKml,
  fetchVehicles,
  printTrail,
  clearTrail
} from '../../actionCreators';
import { connect } from 'react-redux';

import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardContent } from 'material-ui/Card';
import { BottomNavigation, BottomNavigationAction, Divider, Switch, Checkbox, Select, InputLabel } from 'material-ui';
import { Restore as RestoreIcon, NearMe, LocationOn } from 'material-ui-icons';
import List, { ListItem, ListItemText, ListSubheader, ListItemIcon } from "material-ui/List";
import { MenuItem } from 'material-ui/Menu';
import Collapse from 'material-ui/transitions/Collapse';
import { ExpandLess, ExpandMore, MoveToInbox as InboxIcon } from 'material-ui-icons';
import theme from '../../app/theme.json';
import { withStyles } from 'material-ui/styles';
import { compose } from "recompose";

const layout = theme.layout;
const themeSelector = 0 // 0: Light, 1: Dark

export const styles = theme => ({
  tabWrapper: {
    'nav': {
      display: 'flex',
      flexDirection: 'row'
    }
  }
})

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
}

class SidebarContainer extends Component {
  state = {
    open: false,
    colKey: 0,
    vehicles: {},
    switch: false,
    checked: false,
    zonePicked: null,
    selectedSubzone: ''
  };
  componentDidMount() {
    this.props.fetchZones();
  }

  handleClick = (zoneId) => () => {
    if (!this.state.open) {
      this.props.fetchVehicles(zoneId);
      this.props.clearZoneKml(this.props.zones[zoneId]);
      this.setState({ open: true, colKey: zoneId, switch: false, zonePicked: this.props.zones[zoneId] });
    } else this.setState({ open: false });
  };

  handleCheck = (zoneId, vehicleId) => () => {
    if (!this.state.checked) {
      this.props.printTrail(zoneId, this.props.vehicles[vehicleId].id);
    } else {
      this.props.clearTrail();
    }
    this.setState({ checked: !this.state.checked })
  }

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSwitch = zone => () => {
    const subzone = zone.subzones[this.state.selectedSubzone];
    (!this.state.switch) ?
      this.props.printZoneKml(subzone) :
      this.props.clearZoneKml(zone);
    this.setState({ switch: !this.state.switch })
  }

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
              {zones && (
                Object.keys(zones).map((zoneId, index) => (
                  <div key={`div${index}`}>
                    <ListItem
                      button
                      onClick={this.handleClick(zoneId)}
                      key={`ListItem${zoneId}`}
                      value={zoneId}
                    >
                      <ListItemIcon key={`ListItemIcon_${zoneId}`}>
                        <InboxIcon key={`InboxIcon${zoneId}`} />
                      </ListItemIcon>
                      <ListItemText key={`ListItemText${zoneId}`} inset primary={zones[zoneId].title} />
                      {(this.state.open && this.state.colKey === zoneId) ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open && this.state.colKey === zoneId} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding
                      >
                        {!!vehicles && (Object.keys(vehicles).map(vehicleId => (
                          <ListItem key={`ListItemIcon_${vehicleId}`} button style={{ padding: 0, paddingLeft: 25 }}>
                            <Checkbox
                              tabIndex={-1}
                              onClick={this.handleCheck(zoneId, vehicleId)}
                              disableRipple
                            />
                            <ListItemText key={`ListItemText${vehicles[vehicleId].id}`} inset primary={vehicles[vehicleId].id} />
                          </ListItem>
                        )))}
                      </List>
                      <Divider />
                      <div>
                        <div>
                          <InputLabel style={{ margin: "20px 10px 0 0" }} htmlFor={`select_${zoneId}`}>Seleccionar Subzona </InputLabel>
                          <Select
                            value={this.state.selectedSubzone}
                            style={{ width: '150px' }}
                            onChange={this.handleSelect}
                            inputProps={{
                              name: 'selectedSubzone',
                              id: `select_${zoneId}`,
                            }}
                          >
                            {!!this.state.zonePicked && this.state.zonePicked.id === zones[zoneId].id && Object.keys(this.state.zonePicked.subzones).map((subzone, subzoneIndex) => {
                              return (
                                <MenuItem key={`kml_${subzoneIndex}`}
                                  value={subzone}>
                                  {this.state.zonePicked.subzones[subzone].title}
                                </MenuItem>)
                            })}
                          </Select>
                        </div>
                        <ListSubheader style={{ display: 'flex', flexDirection: 'row', marginRight: '55px' }}>
                          <div style={{ flex: 1, fontWeight: 'bold', marginRight: '45px' }}>Mostrar en Mapa</div>
                          <div>
                            <Switch
                              onChange={this.handleSwitch(zones[zoneId])}
                            />
                          </div>
                        </ListSubheader>
                        <Divider />
                      </div>
                    </Collapse>
                  </div>
                )))}
            </List>
          </CardContent>
        </Card>
        <div>
          <Divider />
          <BottomNavigation value={1} style={cssStyles.cardBottom}>
            <BottomNavigationAction label="Recents" value="recents" icon={<NearMe style={{ color: cssStyles.iconColor["selected"] }} />} />
            <BottomNavigationAction label="Favorites" value="favorites" icon={<LocationOn style={{ color: cssStyles.iconColor["default"] }} />} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<RestoreIcon style={{ color: cssStyles.iconColor["default"] }} />} />
          </BottomNavigation>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    zones: state.zones.data,
    vehicles: state.vehicles.data,
    trails: state.trails.data,
  }
}

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
    clearTrail(zoneId, vehicleId) {
      dispatch(clearTrail(zoneId, vehicleId));
    }
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SidebarContainer)
