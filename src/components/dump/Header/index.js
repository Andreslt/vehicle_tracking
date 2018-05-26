import React from 'react';
import {IconButton} from 'material-ui';
import {compose, withStateHandlers} from "recompose";
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, {MenuItem} from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';

const Header = compose(
  withStateHandlers(() => ({
    anchorEl: null,
    openIcon: false
  }), {
    handleMenu: ({anchorEl}) => function (event) {
      return {
        anchorEl: event.target
      };
    },
    handleClose: ({anchorEl}) => () => {
      return {
        anchorEl: null
      };
    }
  })
)(props => {
  const {anchorEl, isAdmin, companies, handleCompanyChange} = props;
  const open = Boolean(anchorEl);
  return (
    <div style={{position: "absolute", right: "25px", bottom: "6px"}}>
      {isAdmin && <InputLabel style={{ margin: '0 16px' }} htmlFor="company">Empresa</InputLabel>}
      {isAdmin && <Select
        value={companies.currentCompany}
        onChange={handleCompanyChange}
        inputProps={{ name: 'company', id: 'company' }}
        style={{ margin: '0 32px 0 8px' }}
      >
        {companies.ids.map(companyId => (
          <MenuItem
            key={companyId}
            value={companyId}
          >
            {companies.byId[companyId].name}
          </MenuItem>
        ))}
      </Select>}
      <IconButton
        aria-owns={open ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={props.handleMenu}
        color="inherit"
      >
        <AccountCircle/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={props.handleClose}
      >
        <MenuItem onClick={props.handleClose}>Cuenta</MenuItem>
        <MenuItem onClick={props.onLogout}>Salir</MenuItem>
      </Menu>
    </div>
  )
});

export default Header;