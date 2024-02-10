const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');

const PORT = process.env.PORT ?? 5000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', socket => {
  console.log('Connection  :>> ');
  socket.emit('HELLO_SELF', 'Hello on service');
  socket.broadcast.emit('NEW_ANOTHER_SOCKET', 'New socket is added');
  io.emit('TO_EVERYONE', 'Service will reboot at 5 minutes');

  socket.on('TO_SERVER', payload => {
    console.log('payload :>> ', payload);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
