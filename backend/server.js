const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Socket.io
io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    socket.on('chat message', (msg) => {
        // Emitindo a mensagem para todos os usuários conectados
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

// Iniciar o servidor
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});