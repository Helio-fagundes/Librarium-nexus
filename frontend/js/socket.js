const socket = new SockJS('http://localhost:3000/chat');

socket.onopen = function () {
    console.log('Conectado ao servidor');
    socket.send('Olá servidor!');
};

socket.onmessage = function (e) {
    console.log('Mensagem recebida:', e.data);
};

socket.onclose = function () {
    console.log('Conexão fechada');
};