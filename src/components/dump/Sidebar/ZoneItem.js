import React from 'react';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
import {ListItem, ListItemText, ListItemIcon, ListSubheader} from "material-ui/List";
import Collapse from 'material-ui/transitions/Collapse';
import { ExpandLess, ExpandMore, MoveToInbox as InboxIcon } from 'material-ui-icons';

import SubZonesSelect from './SubZonesSelect';

const ZoneItem = props => {
  const {
    zoneKey, zone, isExpanded, zonePicked, selectedSubZone, kmlEmptyError,
    vehicleList,
    onZoneClick, onSubZoneSelect, onToggleSwitch
  } = props;
  return (
    <div>
      <ListItem
        button
        onClick={onZoneClick}
        value={zoneKey}
      >
        <ListItemIcon><InboxIcon/></ListItemIcon>
        <ListItemText inset primary={zone.name} />
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {vehicleList}
        <Divider />
        <div>
          <SubZonesSelect
            zoneKey={zoneKey}
            zoneId={zone.id}
            selectedSubZone={selectedSubZone}
            zonePicked={zonePicked}
            handleSelect={onSubZoneSelect}
          />
          <ListSubheader style={{ display: 'flex', flexDirection: 'row', marginRight: '55px' }}>
            <div style={{ flex: 1, fontWeight: 'bold', marginRight: '45px' }}>Mostrar en Mapa</div>
            <div>
              <Switch
                onChange={onToggleSwitch}
                disabled={!selectedSubZone}
              />
            </div>
          </ListSubheader>
          {/* <Typography>{kmlEmptyError && 'El sector no contiene un archivo KML asignado.'}</Typography> */}
          <Divider />
        </div>
      </Collapse>
    </div>
  );
};

export default ZoneItem;