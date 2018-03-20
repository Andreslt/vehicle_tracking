import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import { Typography, BottomNavigation, BottomNavigationAction, Icon, Divider } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import { Paper } from 'material-ui';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { compose, withStateHandlers, withState, withHandlers } from "recompose";
import classnames from 'classnames';
import { Restore as RestoreIcon, Traffic, Adjust, NearMe, LocationOn } from 'material-ui-icons';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import List, { ListItem, ListItemText, ListSubheader } from "material-ui/List";
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from "material-ui/ExpansionPanel";

const LayoutTheme = [
    {
        background: "linear-gradient(45deg, rgb(33, 150, 243) 100%, #3ab7aa 90%)",
        fontColor: "#f50057"
    },
    {
        background: "#282828",
        fontColor: "#1394ff",
        tabs: "#eaedf0"
    },

]

const themeSelector = 1 // 0: Light, 1: Dark

const classes = {
    card: {
        maxWidth: 345,
        display: "flex",
        flex: 1,
        // justifyContent: "center",
        flexDirection: "column",       
        // flexGrow: 2,
    },
    cardHeader: {
        background: "#1394ff",
        height: "2.5em"
    },
    cardContent: {
        maxHeight: "35em",
        overflow: 'auto',
        padding: 0,
        background: "whitesmoke"
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
        padding: 0
    },
    ListSubheader: {
        color: LayoutTheme[themeSelector].fontColor,
        float: 'left',
        fontSize: "medium"
    },
    ListItem: {
        padding: 5
    },
    cardBottom: {
        background: LayoutTheme[themeSelector].background,
        margin: "0",
        paddin: "20",
        color: "white"
    },
    iconColor: {
        default: "white",
        selected: LayoutTheme[themeSelector].fontColor
    }
}

const Sidebar = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1 /*flexWrap: "wrap" */ }}>
            <Card style={classes.card}>
                <CardHeader style={classes.cardHeader} >

                </CardHeader>
                <Tabs width="20px" value={0} style={classes.tabs}>
                    <Tab
                        label={`Rutas 1`} style={classes.singleTab} />
                    <Tab label="Vehiculos" style={classes.singleTab} />
                </Tabs>
                <CardContent style={classes.cardContent} >
                    <List style={classes.list} subheader={<li />}>
                        {[0,1,2,3,4].map(sectionId => (
                            <li key={`section-${sectionId}`}>
                                <ul style={{ padding: '0' }}>
                                    <ListSubheader style={classes.ListSubheader} >
                                        {`ID Ruta: ${sectionId}`}
                                    </ListSubheader>
                                    {[0, 1].map(item => (
                                        <ListItem
                                            style={classes.ListItem}
                                            key={`item-${sectionId}-${item}`}>

                                            <ExpansionPanel>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography className={classes.heading}>
                                                        Expansion Panel 1
                                                    </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Suspendisse malesuada lacus ex, sit amet blandit leo
                                                        lobortis eget.
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </List>
                    {/* </Paper> */}
                </CardContent>
            </Card>
            <div style={{ /* flexGrow: 1 */ }}>
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
export default Sidebar;
