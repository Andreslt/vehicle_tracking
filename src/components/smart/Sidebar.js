import React, { Component } from 'react';
import { fetchZones, fetchVehicles, printRoute, printRouteTrail } from '../../actionCreators';
import { connect } from 'react-redux';
// import Sidebar from '../dump/Sidebar'

// 
import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import { Typography, BottomNavigation, BottomNavigationAction, Divider } from 'material-ui';
import { Restore as RestoreIcon, NearMe, LocationOn } from 'material-ui-icons';
import List, { ListItem, ListItemText, ListSubheader, ListItemIcon } from "material-ui/List";
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from "material-ui/ExpansionPanel";
import Collapse from 'material-ui/transitions/Collapse';
import { ExpandLess, ExpandMore, StarBorder, SendIcon, KeyboardArrowRight, Drafts as DraftsIcon, MoveToInbox as InboxIcon } from 'material-ui-icons';

import theme from '../../app/theme.json';
const layout = theme.layout;
const themeSelector = 0 // 0: Light, 1: Dark
//

const classes = {
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
    boxShadow: "0 1px 0 0 rgba(0,0,0,.1), 2px 5px 5px 0 rgba(0,0,0,.05)"
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
  constructor(props, context) {
    super(props, context);
  }
  state = { open: false, colKey: 0 };
  componentDidMount() {
    this.props.fetchZones();
  }

  onItemClick(item, e) {
    console.log('item -> ', item);    
  }

  handleClick = (index, zoneId) => () => {
    console.log('zoneId-> ', zoneId)
    console.log('this.props.zones-> ', this.props.zones)
    this.props.fetchVehicles(this.props.zones[zoneId]);
    this.setState({ open: !this.state.open, colKey: index });
  };

  render() {
    const { zones, vehicles } = this.props;
    let boundItemClick;
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Card style={classes.card}>
          <Tabs width="auto" value={0} style={classes.tabs}>
            <Tab
              label={`Zonas`} style={classes.singleTab} />
          </Tabs>
          <CardContent style={classes.cardContent}>
            <List component="nav" style={classes.list} >
              {zones && (
                Object.keys(zones).map((zoneId, index) => (
                  <div key={`div${index}`}>
                    <ListItem button
                      key={`ListItem${zoneId}`}
                      value={zoneId}
                      onClick={this.handleClick(index, zoneId)}
                      style={{ height: "80px", border: "1px solid rgba(0,0,0,.14)" }}>

                      <ListItemIcon key={`ListItemIcon_${zoneId}`}  >
                        <InboxIcon key={`InboxIcon${zoneId}`} />
                      </ListItemIcon>
                      <ListItemText key={`ListItemText${zoneId}`} inset primary={zones[zoneId].title}>
                        <ExpandLess />
                      </ListItemText>
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                      <ListItem>
                      <ListItemText inset primary="test" />
                      </ListItem>
                        {vehicles && (
                          Object.keys(vehicles).map((vehicleId) => (
                            <ListItem button onClick={this.onItemClick.bind(this, vehicleId)} >
                            {console.log('vehicleId-> ', vehicleId)}
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText inset primary={vehicles[vehicleId].title} />
                            </ListItem>
                          )))}
                      </List>
                    </Collapse>
                  </div>
                )))}
            </List>
          </CardContent>
        </Card>
        <div>
          <Divider />
          <BottomNavigation value={1} style={classes.cardBottom}>
            <BottomNavigationAction label="Recents" value="recents" icon={<NearMe style={{ color: classes.iconColor["selected"] }} />} />
            <BottomNavigationAction label="Favorites" value="favorites" icon={<LocationOn style={{ color: classes.iconColor["default"] }} />} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<RestoreIcon style={{ color: classes.iconColor["default"] }} />} />
          </BottomNavigation>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    zones: state.routes.zones,
    vehicles: state.routes.vehicles,
    trails: state.trails,
    activeKey: state.activeKey,
    realtime: state.realtime,
    selectedTab: 0
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
    printRoute(route) {
      dispatch({ type: "PRINT_ROUTE_TRAIL", payload: '' })
      dispatch(printRoute(route));
      dispatch(printRouteTrail(route))
    },
    // printRouteTrail(realtime) {
    //   if (realtime) dispatch(printRouteTrail());
    //   else dispatch({ type: "PRINT_ROUTE_TRAIL", payload: '' })
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);