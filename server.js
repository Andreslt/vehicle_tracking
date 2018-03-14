const Express = require('express');
const app = Express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const firebase = require('./firebase');
const cors = require('cors');

const path = require('path');

app.use("/", Express.static(path.join(__dirname, "static")));
app.use(cors());

// DEVICE DATA
app.get('/data', (req, res)=> {
  io.on('connect', function (device) {
    device.on('signal', (data) => {
      firebase.addCollection('route_01', data);
    });
  });
});

// APP
app.get('/roadmap/:route', (req, res)=> {
  const limit = 7;
  console.log('route-> ', req.params.route);
  firebase.query(req.params.route, limit, points => {
    return res.json(points)
  });
});

http.listen(8000, function () {
  console.log('listening on port 8000');
});