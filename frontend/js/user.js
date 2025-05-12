const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");
userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});


const botaoUpload = document.querySelector(".add-image");
const inputImagem = document.getElementById("imagem");
const preview = document.querySelector(".imagem-preview");

botaoUpload.addEventListener("click", function () {
    inputImagem.click();
});

inputImagem.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 600px;"/>`;
        };
        reader.readAsDataURL(file);
    }
});

const userName = document.querySelector(".user-name");
const userEmail = document.querySelector(".user-email");

if (logged) {
    userName.innerHTML = `${logged.nome}`;
    userEmail.innerHTML = `${logged.email}`;
} else {
    console.log("Nenhum usuário logado.");
}

function exituser() {
    localStorage.removeItem("logged");
    window.location.href = "/pages/login.html";
}