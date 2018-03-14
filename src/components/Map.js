import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, KmlLayer, Marker, InfoWindow } from "react-google-maps";
import Snippet from './Snippet';
// const FaAnchor = require("react-icons/lib/fa/anchor");

const MapComponent =
  compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v3",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withStateHandlers(() => ({
      isOpen: false,
      selectedKey: ''
    }), {
        onToggleOpen: ({ isOpen, selectedKey }) => key => {
          return {
            isOpen: !isOpen,
            selectedKey: key
          };
        }
      }),
    withScriptjs,
    withGoogleMap,
  )(props =>
    <GoogleMap
      zoom={17}
      center={{ lat: props.map.latitude, lng: props.map.longitude }}
    >
      {props.roadmap &&
        Object.keys(props.roadmap).map((point, key) => {
          const mapProps = props.roadmap[point].mapProps;
          return <Marker
            id={point}
            position={{ lat: mapProps.latitude, lng: mapProps.longitude }}
            key={point}
            icon={{
              path: 'M 100 100 L 300 100 L 200 300 z',
              fillColor: 'blue',
              fillOpacity: 0.8,
              scale: 0.0005,
              strokeColor: 'blue',
              strokeWeight: 5
            }}
            onClick={() => { 
              props.onToggleOpen(key) }}
          >
            {props.isOpen && props.selectedKey === key && <InfoWindow
              id={key}
              position={{ lat: mapProps.latitude, lng: mapProps.longitude }}
              onCloseClick={props.onToggleOpen}
            >
              <Snippet point={mapProps}/>
            </InfoWindow>}
          </Marker>
        })}
      <KmlLayer
        url={props.map.kml}
        options={{ preserveViewport: true }}
      />
    </GoogleMap>
    )

export default MapComponent;