import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

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
        name: 'selectedSubzone',
        id: `select_${zoneKey}`,
      }}
    >
      {!!zonePicked && zonePicked.id === zoneId && Object.keys(zonePicked.subzones).map((subZoneKey, subZoneIndex) => (
        <MenuItem key={`kml_${subZoneIndex}`} value={subZoneKey}>
          {zonePicked.subzones[subZoneKey].title}
        </MenuItem>
      ))}
    </Select>
  </div>
);

export default SubZonesSelect;