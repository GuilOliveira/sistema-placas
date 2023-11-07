const express = require('express');
const http = require('http');
const createSocket = require('./sockets/sockets');
const cors = require('cors');

// Configuração base do express e CORS
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// Importação de rotas
const placaRota = require('./rotas/placa'); 
const usuarioRota = require('./rotas/usuario');
const alertaRota = require('./rotas/alerta')

// Definição de rotas
app.use('/api/placas', placaRota);
app.use('/api/usuario', usuarioRota);
app.use('/api/alerta', alertaRota);

const PORT = 8080;

// Definição do servidor do socket.io
const server = http.createServer(app);
const io = createSocket(server);
app.set('socketio', io);

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});