import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, KmlLayer, Marker, InfoWindow } from "react-google-maps";
import Snippet from './Snippet';
const FaAnchor = require("react-icons/lib/fa/anchor");

const MapComponent =
  compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withStateHandlers(() => ({
      isOpen: false,
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen,
        })
      }),
    withScriptjs,
    withGoogleMap,
  )(props =>
    <GoogleMap
      zoom={props.defZoom}
      center={{ lat: props.defLat, lng: props.defLong }}
    >
      <Marker
        position={{ lat: props.defLat, lng: props.defLong }}
        onClick={props.onToggleOpen}
      >
        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
          <Snippet />
        </InfoWindow>}
      </Marker>
      <KmlLayer
        url={props.kml}
        options={{ preserveViewport: true }}
      />
    </GoogleMap>
    )

export default MapComponent;