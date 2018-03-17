import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, KmlLayer, Marker, InfoWindow } from "react-google-maps";
import Snippet from '../Snippet';

const MapComponent =
  compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v3",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%` }} />,
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
      zoom={props.map.zoom}
      center={{ lat: props.map.latitude, lng: props.map.longitude }}
    >
      {!!props.trail &&
        Object.keys(props.trail).map((point, key) => {
          const trail = props.trail[point];
          return <Marker
            id={point}
            position={{ lat: trail.latitude, lng: trail.longitude }}
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
              position={{ lat: trail.latitude, lng: trail.longitude }}
              onCloseClick={props.onToggleOpen}
            >
              <Snippet point={trail}/>
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