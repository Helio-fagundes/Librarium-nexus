const userprofile = document.querySelector(".user-profile");

const drop = document.querySelector(".dropuser");

const datetext = document.querySelector("#date");


function GetDateTime() {
    const date = new Date();
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

datetext.innerHTML = GetDateTime();

userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});


const msgcontainer = document.querySelector(".mensagem-container");
const chat = document.querySelector("#chat-container");
const back = document.querySelector(".voltar");

chat.addEventListener("click", () => {
    if (msgcontainer.style.display === "none" || msgcontainer.style.display === "") {
        chat.style.display = "none";
        msgcontainer.style.display = "block";
    }
});
back.addEventListener("click", (e) => {
    e.preventDefault();
    msgcontainer.style.display = "none";
    chat.style.display = "block";
});


(function () {
    const socket = new SockJS('http://localhost:3000/chat');

   
    socket.onopen = function () {
        console.log('Conectado ao servidor');
    };

   
    socket.onmessage = function (e) {
        console.log('Mensagem recebida:', e.data);

    
        const chatContainer = document.querySelector('.mensagem-container');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('mensagem');  
        messageDiv.innerHTML = `
          <div class="usuario">
            <div class="letra">M</div>
            <div class="conteudo">
                <div class="nome">Maria Oliveira</div>
                <div class="texto">${e.data}</div>  <!-- Usando e.data para exibir a mensagem -->
                <div class="hora">07:15</div>
            </div>
          </div>
        `;
        chatContainer.appendChild(messageDiv);

        messageInput.value = ''; 
    };

   
    socket.onclose = function () {
        console.log('Conexão fechada');
    };


    const sendButton = document.querySelector('.entrada button');
    const messageInput = document.querySelector('.entrada input');

 
    sendButton.addEventListener('click', function () {
        const message = messageInput.value.trim();
        if (message) {
            socket.send(message); 
            console.log('Mensagem enviada:', message);
            const chatContainer = document.getElementById('insert-chat');
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat');
            messageDiv.innerHTML = `
            <div class="user">
                <div class="user-chat">
                    <img src="/img/pessoa.png" alt="Usuário">
                </div>
                <div>
                    <h4>Você</h4>
                    <p>${message}</p>
                </div>
            </div>
        `;
            chatContainer.appendChild(messageDiv);
        }
    });
})();


