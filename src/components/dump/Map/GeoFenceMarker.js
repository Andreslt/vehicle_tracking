import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { Marker, Circle, InfoWindow } from "react-google-maps";
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const GeoFenceMarker = ({ name, lat, lng, radius, visible, uid, currentUser, classes, open, toggleInfoWindow, handleDelete }) => (
  <Marker
    label={name}
    position={{ lat, lng }}
    onClick={toggleInfoWindow}
  >
    <Circle
      center={{ lat, lng }}
      radius={radius}
      visible={visible}
      onClick={toggleInfoWindow}
    />
    {open && <InfoWindow
      position={{ lat, lng }}
      onCloseClick={toggleInfoWindow}
    >
      <div className={classes.root}>
        <Typography variant="headline">{name}</Typography>
        <Typography>Lat/Lng: <strong>{lat}, {lng}</strong></Typography>
        <Typography>Radio: <strong>{radius}</strong></Typography>
        {uid === currentUser && <Button
          variant="raised"
          color="primary"
          size="small"
          className={classes.button}
          onClick={handleDelete}
        >
          Borrar
        </Button>}
      </div>
    </InfoWindow>}
  </Marker>
);

export default compose(
  withStyles(styles),
  withStateHandlers({
    open: false,
  }, {
    toggleInfoWindow: ({ open }) => () => {
      return {
        open: !open,
      };
    },
    handleDelete: (state, { onDelete, id }) => () => onDelete(id),
  })
)(GeoFenceMarker);