const http = require('http');
const sockjs = require('sockjs');
const echo = sockjs.createServer();

echo.on('connection', function (conn) {
    console.log('Cliente conectado');

    conn.on('data', function (message) {
        console.log('Recebido do cliente:', message);
        conn.write(`Eco do servidor: ${message}`);
    });

    conn.on('close', function () {
        console.log('Cliente desconectado');
    });
});

const server = http.createServer();
echo.installHandlers(server, { prefix: '/chat' });

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});