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