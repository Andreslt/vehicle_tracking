import React from 'react';
import {IconButton} from 'material-ui';
import {compose, withStateHandlers} from "recompose";
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, {MenuItem} from 'material-ui/Menu';

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
  const {anchorEl} = props;
  const open = Boolean(anchorEl);
  return (
    <div style={{position: "absolute", right: "25px", bottom: "6px"}}>
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