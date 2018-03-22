import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
// import Collapse from 'material-ui/transitions/Collapse';
import { Typography, BottomNavigation, BottomNavigationAction, Divider } from 'material-ui';
// import IconButton from 'material-ui/IconButton';
// import { Paper } from 'material-ui';
// import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// import { compose, withStateHandlers, withState, withHandlers } from "recompose";
// import classnames from 'classnames';
import { Restore as RestoreIcon, NearMe, LocationOn } from 'material-ui-icons';
// import LocationOnIcon from 'material-ui-icons/LocationOn';
import { compose, withStateHandlers, withProps } from "recompose";

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

import theme from '../../../app/theme.json';
const layout = theme.layout;
const themeSelector = 0 // 0: Light, 1: Dark

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
        // background: "whitesmoke"
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
        // backgroundColor: theme.palette.background.paper,
    },
    ListSubheader: {
        color: layout[themeSelector].fontColor,
        float: 'left',
        fontSize: "medium"
    },
    ListItem: {
        padding: 5,
        // paddingLeft: 5,
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

const Sidebar = compose(
    withStateHandlers(() => ({
        selectedRoute: false
    }), {
        handlingOnClick: ({  selectedRoute }) => () => {
            console.log('selectedRoute-> ', selectedRoute)
            return {
                selectedRoute: !selectedRoute
            }
        }
        })
)(props => {
    const { selectedRoute } = props;
    return (
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
                        {props.routes && (
                            Object.keys(props.routes).map(route => (
                                <ListItem button
                                    key={route.id}
                                    onClick={ props.handlingOnClick }
                                    style={{ height: "80px", borderBottom: "1px solid rgba(0,0,0,.14)" }}>
                                    {selectedRoute? props.printRoute(props.routes[route]):''}
                                    {/* {console.log('-props.routes-> ', props.routes[route])}
                                    {console.log('-route-> ', route)} */}
                                    <ListItemIcon key={route.id}  >
                                        <InboxIcon key={route.id} />
                                    </ListItemIcon>

                                    <ListItemText key={route.id} inset primary="Inbox" />
                                    <KeyboardArrowRight />
                                </ListItem>
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
})

export default Sidebar;
