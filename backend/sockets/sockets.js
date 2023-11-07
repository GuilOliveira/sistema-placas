const socketIo = require('socket.io');
const socketioJwt = require('socketio-jwt');

module.exports = (server) => {
  // Configuração CORS
    const io = socketIo(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
          allowedHeaders: ['x-auth-token'],
          credentials: true,
        },
      });
  // Fazendo autenticação da conexão
      io.use(socketioJwt.authorize({
        secret: process.env.SECRET_KEY,
        handshake: true
      }));
  
    io.on('connection', (socket) => {
      socket.on('authentication_failed', (data) => {
      });
      // Caso receba o alerta, emite o alerta aos demais usuários
      socket.on('alerta', (mensagem) => {
        socket.emit('alerta', mensagem);
      });
      socket.on('disconnect', () => {
      });
    });
  
    return io;
};
