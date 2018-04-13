import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, KmlLayer, Marker, InfoWindow, Polyline } from "react-google-maps";
import Snippet from '../Snippet';

const compMapCenter = (type, modeOn, trails, zone) => {
  let latitude, longitude, zoom;
  if (type === 'zoom'){
    zoom = (modeOn)? zone.zoom : 17;
    return zoom
  }

  if (modeOn || trails == null) { // Multitracking on
    console.log('ENTRO EN MULTITRACKING ON');
    latitude = zone.latitude;
    longitude = zone.longitude;
  } else { // Multitracking off
    console.log('ENTRO EN MULTITRACKING OFF');
    const index = Object.keys(trails).slice(0)[0]; // Vehicle ID
    const lastTrail = Object.keys(trails[index]).slice(-1);
    latitude = trails[index][lastTrail].latitude;
    longitude = trails[index][lastTrail].longitude;
  }
  return { lat: latitude, lng: longitude }
}

const MapComponent =
  compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCniTt6A56xPK-x24erdQzoniv2yYV2NSM",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%`, marginBottom: '66px' }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withStateHandlers(() => ({
      isOpen: false,
      selectedKey: '',
      linePath: [],
      lineProps: {
        options: {
          key: 'polyline',
          fillOpacity: 1,
          strokeColor: 'aquamarine',
          strokeWeight: 10
        }
      }
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
      zoom={compMapCenter('zoom', props.multiTrackingMode, null, props.map)}
      center={compMapCenter(null, props.multiTrackingMode, props.trails, props.map)}
    >
      {!!props.trails &&
        Object.keys(props.trails).map((vehicleTrail, vehiKey) => {
          const linePath = [];
          return <div key={`vehiKey_${vehiKey}`}>
            {Object.keys(props.trails[vehicleTrail]).map((point, key) => {
              const trail = props.trails[vehicleTrail][point];
              const lastPoint = Object.keys(props.trails[vehicleTrail]).length - 1;
              linePath.push({ lat: trail.latitude, lng: trail.longitude })
              let iconProps = {
                path: 'M 100 100 L 300 100 L 200 300 z',
                fillColor: 'blue',
                fillOpacity: 0.8,
                scale: 0.001,
                strokeColor: 'blue',
                strokeWeight: 5
              }
              if (key === 0) {
                iconProps = {
                  ...iconProps,
                  fillColor: 'green',
                  scale: 0.07,
                  strokeColor: 'white',
                  strokeWeight: 2
                }
              } else if (key === lastPoint) {
                iconProps = {
                  ...iconProps,
                  fillColor: 'red',
                  scale: 0.07,
                  strokeColor: 'white',
                  strokeWeight: 2
                }
              }
              return (
                <Marker
                  id={`marker_${point}`}
                  position={{ lat: trail.latitude, lng: trail.longitude }}
                  key={point}
                  icon={iconProps}
                  onClick={() => {
                    props.onToggleOpen(key)
                  }}
                >
                  {props.isOpen && props.selectedKey === key && <InfoWindow
                    id={key}
                    position={{ lat: trail.latitude, lng: trail.longitude }}
                    onCloseClick={props.onToggleOpen}
                  >
                    <Snippet point={trail} />
                  </InfoWindow>}
                </Marker>)
            })}
            <Polyline
              {...props.lineProps}
              path={linePath}
            />
          </div>
        })}
      <KmlLayer
        url={props.map.kml}
        options={{ preserveViewport: true }}
      />
    </GoogleMap>
    )

export default MapComponent;