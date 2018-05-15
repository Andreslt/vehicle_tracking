import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, KmlLayer, Marker, InfoWindow, Polyline, Circle } from "react-google-maps";
import Snippet from '../Snippet';
import GeoFenceForm from './GeoFenceForm';

const mapProperties = props => {
  const { trails, currentZone/*, drawnKML*/ } = props;
  let /*lat, lng, zoom, map,*/ mapProps;
  switch (trails.mode) {
    case 'none':
    case 'multi':
      mapProps = currentZone.mapProps;
      break;
    case 'single':
    default:
      if (!trails.data) {
        mapProps = currentZone.mapProps;
      } else {
        const index = Object.keys(trails.data).slice(0)[0]; // Vehicle ID
        const lastTrail = Object.keys(trails.data[index]).slice(-1);
        const { lat, lng } = trails.data[index][lastTrail];
        mapProps = {
          lat,
          lng,
          zoom: 16,
        }
      }
  }
  return mapProps
}

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
    // currentZone,
    trails,
    onToggleOpen,
    isOpen,
    selectedKey,
    lineProps,
    mapMode,
    drawnKML,
    handleMapClick,
    geoFences,
    newGeoFence,
    handleNewGeoFenceInfoWindowClose,
    handleNewGeoFenceCreate,
  } = props;
  const children = [];
  const { zoom, lat, lng } = mapProperties(props);
  const center = { lat, lng };
  const mapProps = {};
  switch (mapMode) {
    case "geoFences":
      mapProps.defaultZoom = zoom;
      mapProps.defaultCenter = center;
      if (newGeoFence) {
        children.push(<Marker
          key="marker_new"
          label={newGeoFence.name}
          position={{ lat: newGeoFence.lat, lng: newGeoFence.lng }}
        >
          <InfoWindow
            position={{ lat: newGeoFence.lat, lng: newGeoFence.lng }}
            onCloseClick={handleNewGeoFenceInfoWindowClose}
          >
            <GeoFenceForm {...newGeoFence} onSave={handleNewGeoFenceCreate} />
          </InfoWindow>
          <Circle
            center={{ lat: newGeoFence.lat, lng: newGeoFence.lng }}
            radius={newGeoFence.radius}
          />
        </Marker>);
      }
      children.push(...geoFences.ids.map(geoFenceId => (
        <Marker
          key={`marker_${geoFenceId}`}
          label={geoFences.byId[geoFenceId].name}
          position={{ lat: geoFences.byId[geoFenceId].lat, lng: geoFences.byId[geoFenceId].lng }}
        >
          <Circle
            center={{ lat: geoFences.byId[geoFenceId].lat, lng: geoFences.byId[geoFenceId].lng }}
            radius={geoFences.byId[geoFenceId].radius}
            visible={geoFences.byId[geoFenceId].visible}
          />
        </Marker>
      )));
      break;
    case "recent":
    default:
      mapProps.zoom = zoom;
      mapProps.center = center;
      const data = trails.data;
      if (!!data) {
        children.push(...Object.keys(data).map((vehicleId, vehiKey) => {
          const linePath = [];
          return <div key={`vehiKey_${vehiKey}`}>
            {Object.keys(data[vehicleId]).map((point, key) => {
              const trail = data[vehicleId][point];
              const lastPoint = Object.keys(data[vehicleId]).length - 1;
              linePath.push({ lat: trail.lat, lng: trail.lng });
              const iconProps = getIconProps(key, lastPoint);
              return (
                <Marker
                  id={`marker_${point}`}
                  position={{ lat: trail.lat, lng: trail.lng }}
                  key={point}
                  icon={iconProps}
                  onClick={() => {
                    onToggleOpen(key)
                  }}
                >
                  {isOpen && selectedKey === key && <InfoWindow
                    id={key}
                    position={{ lat: trail.lat, lng: trail.lng }}
                    onCloseClick={onToggleOpen}
                  >
                    <Snippet point={trail} />
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
          url={drawnKML}
          options={{ preserveViewport: true }}
        />
      );
      break;
  }
  return (
    <GoogleMap
      {...mapProps}
      onClick={handleMapClick}
    >
      {children}
    </GoogleMap>
  );
};

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCniTt6A56xPK-x24erdQzoniv2yYV2NSM",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ flex: 1 }} />,
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
    },
    newGeoFence: null,
  }), {
      onToggleOpen: ({ isOpen, selectedKey }) => key => {
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
              lat: latLng.lat(),
              lng: latLng.lng(),
              radius: 30,
            },
          };
        }
      },
      handleNewGeoFenceInfoWindowClose: () => () => ({
        newGeoFence: null,
      }),
      handleNewGeoFenceCreate: (state, { addGeoFence }) => geoFence => {
        addGeoFence(geoFence);
        return { newGeoFence: null };
      }
    }),
  withScriptjs,
  withGoogleMap,
)(MapComponent);