const userprofile = document.querySelector(".user-profile");
const userName = document.querySelector(".user-name");
const userEmail = document.querySelector(".user-email");
const drop = document.querySelector(".dropuser");
const contactslist = document.querySelector(".mylistcontact");
const usertext = document.querySelector(".user-id-box");
// LOCAL STORAGE
const fotoPerfil = localStorage.getItem("fotoPerfil") || "/img/Design_sem_nome-removebg-preview.png";
const logged = JSON.parse(localStorage.getItem("logged"));
const vendedores = JSON.parse(localStorage.getItem("chatUser")) || [];

if (!logged || !logged.id_usuario) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/pages/login.html";
}
// Mensagens salvas
let mensagensSalvas = JSON.parse(localStorage.getItem("chatMensagens")) || {};

// Exibe imagem do perfil
userprofile.innerHTML = `<img src="${fotoPerfil}" alt="User Profile"/>`;

// Preenche nome e e-mail no menu profile
if (logged) {
    userName.textContent = logged.nome;
    userEmail.textContent = logged.email;
} else {
    alert("Você não está logado.");
    direct();
}

// Toggle do menu dropdown
userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});

usertext.innerHTML = `<h1>Olá, ${logged.nome}</h1>`;


// Logout
function exituser() {
    localStorage.removeItem("logged");
    window.location.href = "/pages/login.html";
}

// Redirecionar se não estiver logado
function direct() {
    window.location.href = "/pages/login.html";
}

// WEBSOCKET & CHAT
let socket;
let userId = logged?.id_usuario;
let recipientId;
let chatHistory = new Map();

function conectar() {
    if (!userId) {
        alert("Você não está logado.");
        direct();
        return;
    }

    socket = new SockJS('http://54.173.229.152:8080/chat');

    socket.onopen = () => {
        console.log('Conectado ao WebSocket');
        document.getElementById('chatArea').style.display = 'block';

        socket.send(JSON.stringify({
            type: 'JOIN',
            senderId: userId,
            content: 'connected'
        }));
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'CHAT') {
            salvarNoHistorico(message);
            if (message.senderId === recipientId || message.senderId === userId) {
                exibirMensagem(message);
            }
        }
    };

    socket.onclose = () => {
        console.log('Desconectado do WebSocket');
    };
}

function iniciarChat(nomeContato) {
    recipientId = document.getElementById('recipientId').value.trim();

    if (!recipientId) {
        alert('Destinatário inválido');
        return;
    }

    document.getElementById('chatHeader').textContent = `Chat com ${nomeContato}`;
    document.getElementById('messages').innerHTML = '';

    const historico = mensagensSalvas[recipientId] || [];
    historico.forEach(exibirMensagem);
}

function enviarMensagem() {
    const input = document.getElementById('messageInput');
    const content = input.value.trim();

    if (!content || !recipientId || socket.readyState !== WebSocket.OPEN) return;

    const message = {
        type: 'CHAT',
        senderId: userId,
        recipientId,
        content
    };

    socket.send(JSON.stringify(message));
    salvarNoHistorico(message);
    exibirMensagem(message);
    input.value = '';
}

function salvarNoHistorico(message) {
    const chatId = message.senderId === userId ? message.recipientId : message.senderId;

    if (!mensagensSalvas[chatId]) mensagensSalvas[chatId] = [];
    mensagensSalvas[chatId].push(message);
    localStorage.setItem("chatMensagens", JSON.stringify(mensagensSalvas));
}

function exibirMensagem(message) {
    const messagesDiv = document.getElementById('messages');
    const div = document.createElement('div');
    div.className = `message ${message.senderId === userId ? 'sent' : 'received'}`;
    div.textContent = message.content;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

document.getElementById('messageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') enviarMensagem();
});

function selecionarContato(id, nome) {
    document.getElementById('recipientId').value = id;
    iniciarChat(nome);
}

function addToContactList() {
    if (!contactslist || !vendedores) {
        console.error("Elemento .mylistcontact ou vendedores não encontrado.");
        return;
    }
    contactslist.innerHTML = "";
    vendedores.forEach(vendedor => {
        if (!vendedor.id_usuario || !vendedor.nome) return;

        const li = document.createElement("li");
        li.innerHTML = `<img src="/img/user-square.png" alt=""> ${vendedor.nome}`;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            selecionarContato(vendedor.id_usuario, vendedor.nome);
        });

        contactslist.appendChild(li);
    });
}

async function getuser() {
    const URL = "http://54.173.229.152:8080/usuario";

    try {
        const resp = await fetch(URL);
        if (!resp.ok) {
            console.error("Erro na requisição:", resp.status);
            return;
        }
        const user = await resp.json();
    } catch (error) {
        console.error("Erro ao conectar com a API:", error);
    }
}

const urlParams = new URLSearchParams(window.location.search);
const idFromUrl = urlParams.get('userId');

if (idFromUrl) {
    const vendedorSelecionado = vendedores.find(v => v.id_usuario === idFromUrl);
    if (vendedorSelecionado) {
        selecionarContato(vendedorSelecionado.id_usuario, vendedorSelecionado.nome);
    } else {
        console.warn("Vendedor do ID da URL não encontrado. Iniciando com o primeiro da lista.");
        if (vendedores.length > 0) {
            selecionarContato(vendedores[0].id_usuario, vendedores[0].nome);
        }
    }
} else {
    if (vendedores.length > 0) {
        selecionarContato(vendedores[0].id_usuario, vendedores[0].nome);
    }
}

addToContactList();
getuser();
conectar();
