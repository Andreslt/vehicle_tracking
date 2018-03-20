
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, Typography, IconButton } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
// import { FormControlLabel, FormGroup } from 'material-ui/Form';
// import Menu, { MenuItem } from 'material-ui/Menu';
import { compose, withStateHandlers } from "recompose";

const styles = {
  root: {
    background: 'linear-gradient(45deg, rgb(33, 150, 243) 30%, #3ab7aa 90%)', //'#282828'
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(33, 150, 243) 80%',
  },
  title: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Header = compose(
  withStateHandlers(() => ({
    auth: true,
    anchorEl: null
  }), {
      handleChange: ({ auth }) => (event, checked) => {
        return { auth: checked }
      },
      handleMenu: ({ anchorEll }) => event =>{
        console.log('Llamado a _____ handleMenu-> ', event.currentTarget)
        return { anchorEl: event.currentTarget }
      },
      handleClose: ({ anchorEl }) => () => {
        return { anchorEl: null }
      }
    })
)(props => {
  const { classes, auth, anchorEl  } = props;
  console.log('anchorEl-> ', anchorEl)
  const open = Boolean(anchorEl);
  console.log('open ', open)
  return (
      <AppBar 
      position="static"
      className={classes.root}
      >
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.title}>
            SMART TRACKING
            </Typography>
          {auth && (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={props.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
  )
})

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);