import React from "react";
import {compose, withProps, withStateHandlers} from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, KmlLayer, Marker, InfoWindow, Polyline, Circle} from "react-google-maps";
import Snippet from '../Snippet';
import GeoFenceForm from './GeoFenceForm';

const compMapCenter = (type, modeOn, trails, zone) => {
  let latitude, longitude, zoom;
  if (type === 'zoom') {
    zoom = (modeOn) ? zone.zoom : 12;
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
  return {lat: latitude, lng: longitude}
};

const getIconProps = (key, lastPoint) => ({
  path: 'M 100 100 L 300 100 L 200 300 z',
  fillColor: 'blue',
  fillOpacity: 0.8,
  scale: 0.001,
  strokeColor: 'blue',
  strokeWeight: 5,
  ...(key === lastPoint && {
    fillColor: 'green',
    scale: 0.01,
    strokeColor: 'green',
    strokeWeight: 5
  }),
  ...(key === 0 && {
    fillColor: 'red',
    scale: 0.01,
    strokeColor: 'red',
    strokeWeight: 5,
  }),
});

const MapComponent = props => {
  const {
    multiTrackingMode,
    trails,
    map,
    onToggleOpen,
    isOpen,
    selectedKey,
    lineProps,
    mapMode,
    handleMapClick,
    geoFences,
    newGeoFence,
    handleNewGeoFenceInfoWindowClose,
    handleNewGeoFenceCreate,
  } = props;
  const children = [];
  switch (mapMode) {
    case "geoFences":
      if (newGeoFence) {
        children.push(<Marker
          key="marker_new"
          label={newGeoFence.name}
          position={{lat: newGeoFence.latitude, lng: newGeoFence.longitude}}
        >
          <InfoWindow
            position={{lat: newGeoFence.latitude, lng: newGeoFence.longitude}}
            onCloseClick={handleNewGeoFenceInfoWindowClose}
          >
            <GeoFenceForm {...newGeoFence} onSave={handleNewGeoFenceCreate} />
          </InfoWindow>
          <Circle
            center={{lat: newGeoFence.latitude, lng: newGeoFence.longitude}}
            radius={newGeoFence.radius}
          />
        </Marker>);
      }
      children.push(...geoFences.map((geoFence, index) => (
        <Marker
          key={`marker_${index}`}
          label={geoFence.name}
          position={{lat: geoFence.latitude, lng: geoFence.longitude}}
        >
          <Circle
            center={{lat: geoFence.latitude, lng: geoFence.longitude}}
            radius={geoFence.radius}
          />
        </Marker>
      )));
      break;
    case "recent":
    default:
      if (!!trails) {
        children.push(...Object.keys(trails).map((vehicleTrail, vehiKey) => {
          const linePath = [];
          return <div key={`vehiKey_${vehiKey}`}>
            {Object.keys(trails[vehicleTrail]).map((point, key) => {
              const trail = trails[vehicleTrail][point];
              const lastPoint = Object.keys(trails[vehicleTrail]).length - 1;
              linePath.push({lat: trail.latitude, lng: trail.longitude});
              const iconProps = getIconProps(key, lastPoint);
              return (
                <Marker
                  id={`marker_${point}`}
                  position={{lat: trail.latitude, lng: trail.longitude}}
                  key={point}
                  icon={iconProps}
                  onClick={() => {
                    onToggleOpen(key)
                  }}
                >
                  {isOpen && selectedKey === key && <InfoWindow
                    id={key}
                    position={{lat: trail.latitude, lng: trail.longitude}}
                    onCloseClick={onToggleOpen}
                  >
                    <Snippet point={trail}/>
                  </InfoWindow>}
                </Marker>)
            })}
            <Polyline
              {...lineProps}
              path={linePath}
            />
          </div>
        }));
      }
      children.push(
        <KmlLayer
          key="KmlLayer"
          url={map.kml}
          options={{preserveViewport: true}}
        />
      );
      break;
  }
  return (
    <GoogleMap
      zoom={compMapCenter('zoom', multiTrackingMode, null, map)}
      center={compMapCenter(null, multiTrackingMode, trails, map)}
      onClick={handleMapClick}
    >
      {children}
    </GoogleMap>
  );
};

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCniTt6A56xPK-x24erdQzoniv2yYV2NSM",
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `91%`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
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
    },
    geoFences: [],
    newGeoFence: null,
  }), {
    onToggleOpen: ({isOpen, selectedKey}) => key => {
      return {
        isOpen: !isOpen,
        selectedKey: key
      };
    },
    handleMapClick: (state, { mapMode }) => ({ latLng }) => {
      if (mapMode === "geoFences") {
        return {
          newGeoFence: {
            name: "",
            latitude: latLng.lat(),
            longitude: latLng.lng(),
            radius: 30,
          },
        };
      }
    },
    handleNewGeoFenceInfoWindowClose: () => () => ({
      newGeoFence: null,
    }),
    handleNewGeoFenceCreate: state => geoFence => ({
      geoFences: [
        ...state.geoFences,
        geoFence,
      ],
      newGeoFence: null,
    })
  }),
  withScriptjs,
  withGoogleMap,
)(MapComponent);