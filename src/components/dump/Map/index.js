import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, KmlLayer, Marker, InfoWindow, Polyline } from "react-google-maps";
import Snippet from '../Snippet';

const compMapCenter = (modeOn, trails, zone) => {
  let latitude, longitude;
  console.log('***** modeOn -> ', modeOn)
  if (modeOn || trails == null) { // Multitracking on
    console.log('** modeOn 1 **');
    latitude = zone.latitude;
    longitude = zone.longitude;
  } else {
    console.log('** modeOn 2 **'); // Multitracking off
    console.log('** trails -> ', trails);
    console.log('** index -> ', index);
    console.log('** lastTrail -> ', lastTrail);
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
      zoom={props.map.zoom}
      center={compMapCenter(props.multiTrackingMode, props.trails, props.map)}
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
      {/* {!!(props.trails) &&
        <Polyline
          {...props.lineProps}
          path={props.linePath}
        />} */}
      <KmlLayer
        url={props.map.kml}
        options={{ preserveViewport: true }}
      />
    </GoogleMap>
    )

export default MapComponent;