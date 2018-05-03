import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const renderMenuItems = subZones => (subZoneKey, subZoneIndex) => (
  <SubZoneMenuItem key={`kml_${subZoneIndex}`} subZoneKey={subZoneKey} subZone={subZones[subZoneKey]}/>
);

const SubZoneMenuItem = ({ subZoneKey, subZone }) => (
  <MenuItem value={subZoneKey}>
    {subZone.title}
  </MenuItem>
);

const SubZonesSelect = ({ zoneKey, zoneId, selectedSubZone, zonePicked, handleSelect }) => (
  <div>
    <InputLabel style={{ margin: "20px 10px 0 0" }} htmlFor={`select_${zoneKey}`}>
      Seleccionar Sector
    </InputLabel>
    <Select
      value={selectedSubZone}
      style={{ width: '150px' }}
      onChange={handleSelect}
      inputProps={{
        name: 'selectedSubZone',
        id: `select_${zoneKey}`,
      }}
    >
      {!!zonePicked && zonePicked.id === zoneId && Object.keys(zonePicked.subzones).map(renderMenuItems(zonePicked.subzones))}
    </Select>
  </div>
);

export default SubZonesSelect;