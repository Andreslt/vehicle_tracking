import React from 'react';
import {Line} from 'react-chartjs-2';
import moment from 'moment';

const hashCode = str => str.split('').reduce((hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0);
const intToRGB = i => {
  const c = (i & 0x00FFFFFF).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
};

const ChartComponent = ({ data }) => {
  const theData = {};
  const geoFences = [];
  if (data) {
    const vehicles = Object.keys(data);
    theData.datasets = vehicles.filter(v => data[v]).map(vehicle => {
      const values = Object.values(data[vehicle]).map(({ geoFence, timestamp }) => {
        let geoFenceIndex = geoFences.findIndex(value => geoFence === value);
        if (geoFenceIndex < 0) geoFenceIndex = geoFences.push(geoFence) - 1;
        return { y: geoFenceIndex, x: Date.parse(timestamp)};
      });
      return {
        label: vehicle,
        lineTension: 0.1,
        fill: false,
        borderColor: `#${intToRGB(hashCode(vehicle))}`,
        data: values,
      };
    });
  }
  return (
    <div style={{ height: '91%' }}>
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        <Line
          data={theData}
          options={{
            scales: {
              xAxes: [{
                type: 'time',
                distribution: 'linear',
                time: {
                  unit: 'hour',
                  displayFormats: {
                    hour: 'MMM D h:mm a',
                  },
                  max: moment().format(),
                  min: moment().subtract(3, 'd').format(),
                },
              }],
              yAxes: [{
                ticks: {
                  stepSize: 1,
                  callback: function (v) {
                    if (geoFences.length > 0 && v >= 0) {
                      return geoFences[v];
                    }
                    return v;
                  }
                },
              }],
            },
          }}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default ChartComponent;