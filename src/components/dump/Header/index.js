import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { AppBar, Toolbar, List, Typography, TextField, Divider, IconButton } from 'material-ui';
import { Menu as MenuIcon, ChevronLeft, ChevronRight } from 'material-ui-icons';
import { compose, withStateHandlers } from "recompose";
import AccountCircle from 'material-ui-icons/AccountCircle';
import Switch from 'material-ui/Switch';
import Menu, { MenuItem } from 'material-ui/Menu';

const drawerWidth = 240;

const styles = {
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  }
};

const Header = compose(
  withStateHandlers(() => ({
    anchorEl: null,
    openIcon: false
  }), {
      handleMenu: ({ anchorEl }) => function(event) {
        return {
          anchorEl: event.target
        };
      },
      handleClose: ({ anchorEl }) => () => {
        return {
          anchorEl: null
        };
      }
    })
)(props => {
  const open = Boolean(anchorEl);
  const { classes, theme, anchorEl } = props;
  return (
    <div style={{position: "absolute", right: "25px", bottom: "6px"}}>
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={props.handleMenu}
            color="inherit"
          >
            <AccountCircle />
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
            <MenuItem onClick={props.handleClose}>Profile</MenuItem>
            <MenuItem onClick={props.handleClose}>My account</MenuItem>
          </Menu>
        </div>
  )
});

export default Header;