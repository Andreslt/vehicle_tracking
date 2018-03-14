var socket = require('socket.io-client')('http://localhost:8000');

const v_position = [
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
  }, 3000)
}

console.log('EXECUTING ...')

signalEmit();