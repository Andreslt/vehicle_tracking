import React, { Component } from 'react';
import { fetchRoutes, printRoute, printRouteTrail } from '../../actionCreators';
import { connect } from 'react-redux';
import Sidebar from '../dump/Sidebar'

// 
import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import { Typography, BottomNavigation, BottomNavigationAction, Divider } from 'material-ui';
import { Restore as RestoreIcon, NearMe, LocationOn } from 'material-ui-icons';
import List, { ListItem, ListItemText, ListSubheader, ListItemIcon } from "material-ui/List";
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from "material-ui/ExpansionPanel";
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';

import { KeyboardArrowRight } from 'material-ui-icons';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';

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
      background: "#eaedf0",
  },
  singleTab: {
      minWidth: 0,
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

    componentDidMount() {
      this.props.fetchRoutes();
    }
  
    onItemClick(item, e) {
      this.props.printRoute(this.props.routes[item])
    }

  render() {
    const { routes } = this.props;
    let boundItemClick;
    return (
      // <Sidebar {...this.props}/>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 /*flexWrap: "wrap" */ }}>
        <Card style={classes.card}>
          <CardHeader style={classes.cardHeader}
            title="APP"
          >
          </CardHeader>
          <Tabs width="20px" value={0} style={classes.tabs}>
            <Tab
              label={`Rutas 1`} style={classes.singleTab} />
            <Tab label="Vehiculos" style={classes.singleTab} />
          </Tabs>
          <CardContent style={classes.cardContent}>
            <List component="nav" style={classes.list} >
              {routes && (
                Object.keys(routes).map((routeId,index )=> (
                  <div key={`div${index}`}>
                    {boundItemClick = this.onItemClick.bind(this, routeId)}
                  <ListItem button
                    key={`ListItem${routeId}`}
                    value={routeId}
                    onClick={boundItemClick}
                    style={{ height: "80px", borderBottom: "1px solid rgba(0,0,0,.14)" }}>
                    <ListItemIcon key={`ListItemIcon_${routeId}`}  >
                      <InboxIcon key={`InboxIcon${routeId}`} />
                    </ListItemIcon>                    
                    <ListItemText key={`ListItemText${routeId}`} inset primary={routes[routeId].title} />
                    <KeyboardArrowRight />
                  </ListItem>
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
    routes: state.routes.data,
    trails: state.trails,
    activeKey: state.activeKey,
    realtime: state.realtime,
    selectedTab: 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRoutes() {
      dispatch(fetchRoutes());
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