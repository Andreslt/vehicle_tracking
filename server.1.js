var socket = require('socket.io-client')('http://localhost:8000');

const v_position = [
  {
    "id": 1,
    "title": "Point 1",
    "mapProps": {
      "latitude": 11.0182277,
      "longitude": -74.941609,
      "zoom": 13
    },
  },
  {
    "id": 2,
    "title": "Point 2",
    "mapProps": {
      "latitude": 11.017637959751099,
      "longitude": -74.94108328703305,
      "zoom": 13
    },
  },
  {
    "id": 3,
    "title": "Point 3",
    "mapProps": {
      "latitude": 11.017406275758542,
      "longitude": -74.94087943914792,
      "zoom": 13
    }
  },
  {
    "id": 4,
    "title": "Point 4",
    "mapProps": {
      "latitude": 11.017153529376804,
      "longitude": -74.94067559126279,
      "zoom": 13
    }
  },
  {
    "id": 5,
    "title": "Point 5",
    "mapProps": {
      "latitude": 11.016837596094382,
      "longitude": -74.94045028570554,
      "zoom": 13
    }
  },
  {
    "id": 6,
    "title": "Point 6",
    "mapProps": {
      "latitude": 11.01654272472481,
      "longitude": -74.94026789549252,
      "zoom": 13
    }
  },
  {
    "id": 7,
    "title": "Point 7",
    "mapProps": {
      "latitude": 11.01679547163112,
      "longitude": -74.93982801321408,
      "zoom": 13
    }
  }
]

let i = 0;

function signalEmit() {
  setTimeout(() => {
    const position = v_position[i];
    socket.emit('signal', position)
    i++;
    if (i < v_position.length) {
      signalEmit();
    }
  }, 2000)
}

console.log('EXECUTING ...')

signalEmit();