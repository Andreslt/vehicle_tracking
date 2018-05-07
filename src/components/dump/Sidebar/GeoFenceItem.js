import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {ListItem, ListItemText, ListItemSecondaryAction} from "material-ui/List";

const GeoFenceItem = props => {
  const {
    geoFence, onClick, onChange
  } = props;
  return (
    <div>
      <ListItem button onClick={onClick}>
        <ListItemText inset primary={geoFence.name} />
        <ListItemSecondaryAction title="Mostrar/Ocultar">
          <Checkbox checked={geoFence.visible} disableRipple onChange={onChange}/>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default GeoFenceItem;