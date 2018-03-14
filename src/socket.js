import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToSignal(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('signal', 1000);
}
export { subscribeToSignal };