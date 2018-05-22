import React, { Component } from 'react';
import { MenuItem } from 'material-ui/Menu';
import {ListItem, ListItemText} from "material-ui/List";
import TextField from 'material-ui/TextField';
import { ExpandLess, ExpandMore } from 'material-ui-icons';
import Collapse from 'material-ui/transitions/Collapse';

function compare (strA, strB) {
  return strA.toLowerCase().includes(strB.toLowerCase());
}

class SubZonesSelect extends Component {
  state = {
    isExpanded: false,
    filter: "",
  };
  handleClick = () => this.setState(({isExpanded}) => ({isExpanded: !isExpanded}));
  handleFilterChange = ({ target: { value } }) => this.setState({ filter: value });
  handleItemClick = key => () => {
    const { selectedSubZone, handleSelect } = this.props;
    if (selectedSubZone !== key) {
      handleSelect({ target: { name: "selectedSubzone", value: key }});
    }
    this.setState({ filter: "", isExpanded: false });
  };
  render() {
    const { zoneId, selectedSubZone, zonePicked } = this.props;
    const { isExpanded, filter } = this.state;
    console.log("selectedSubZone -->", selectedSubZone);
    const subzones = (!!zonePicked && zonePicked.id === zoneId && zonePicked.subzones) ? Object.keys(zonePicked.subzones) : [];
    return (
      <div>
        <ListItem button onClick={this.handleClick}>
          <ListItemText inset primary={selectedSubZone ? (!!zonePicked && zonePicked.id === zoneId && zonePicked.subzones && `Sector: ${zonePicked.subzones[selectedSubZone].title}`): "Seleccionar Sector"} />
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <TextField
            margin="normal"
            label="Filtrar"
            value={filter}
            onChange={this.handleFilterChange}
          />
          {subzones.filter(subZoneKey => compare(zonePicked.subzones[subZoneKey].title, filter)).map((subZoneKey, subZoneIndex) => (
            <MenuItem
              key={`kml_${subZoneIndex}`}
              value={subZoneKey}
              style={{ fontWeight: selectedSubZone === subZoneKey ? 600 : 400 }}
              onClick={this.handleItemClick(subZoneKey)}
            >
              {zonePicked.subzones[subZoneKey].title}
            </MenuItem>
          ))}
          {!zonePicked.subzones &&
          <MenuItem key={`nosubzones`} value="0">
            No existen subzonas
          </MenuItem>
          }
        </Collapse>
        {/*<Select
          value={selectedSubZone}
          style={{ width: '150px' }}
          onChange={handleSelect}
          inputProps={{
            name: 'selectedSubzone',
            id: `select_${zoneKey}`,
          }}
        >
          {!!zonePicked && zonePicked.id === zoneId && zonePicked.subzones && Object.keys(zonePicked.subzones).map((subZoneKey, subZoneIndex) => (
            <MenuItem key={`kml_${subZoneIndex}`} value={subZoneKey}>
              {zonePicked.subzones[subZoneKey].title}
            </MenuItem>
          ))}
          {!zonePicked.subzones &&
          <MenuItem key={`nosubzones`} value="0">
            No existen subzonas
          </MenuItem>
          }
        </Select>*/}
      </div>
    );
  }
}

export default SubZonesSelect;