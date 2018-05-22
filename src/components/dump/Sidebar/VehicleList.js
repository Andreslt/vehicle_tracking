import React from 'react';
import List from "material-ui/List";

import VehicleItem from './VehicleItem';

const VehicleList = props => {
  const {
    vehicles, hooverVehicle, trails,
    onMouseHoverItem, onCheckItem, onOpenModal, onOpenPanel, unCheckAll
  } = props;
  return (
    <List component="div" disablePadding>
      {!!vehicles && Object.keys(vehicles).map((vehicleKey, vehicleIndex) => (
        <VehicleItem
          key={`ListItemIcon_${vehicleKey}`}
          hooverVehicle={hooverVehicle}
          vehicleKey={vehicleKey}
          vehicle={vehicles[vehicleKey]}
          onMouseEnter={onMouseHoverItem(true, vehicleKey)}
          onMouseLeave={onMouseHoverItem(false)}
          onCheck={onCheckItem(vehicles[vehicleKey], vehicleIndex, trails)}
          onOpenModal={onOpenModal(vehicleKey)}
          onOpenPanel={onOpenPanel(vehicleKey)}
          unCheckAll={unCheckAll}
        />
      ))}
    </List>
  );
};

export default VehicleList;