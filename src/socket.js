import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

const subscribeToRoute = cb => {
  socket.on('route', route => cb(null, signal));
  // socket.emit('signal', 1000);
}
export { subscribeToRoute };