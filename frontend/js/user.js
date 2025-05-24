let logged = JSON.parse(localStorage.getItem("logged"));
const userName = document.querySelector(".user-name");
const userEmail = document.querySelector(".user-email");
const completename = document.querySelector("#complete-name");
const username = document.querySelector("#user-name");
const email = document.querySelector("#email");

if (logged) {
    userName.innerHTML = logged.nome;
    userEmail.innerHTML = logged.email;

    completename.value = logged.nome;
    username.value = logged.nome;
    email.value = logged.email;
} else {
    console.log("Nenhum usuário logado.");
}


function exituser() {
    localStorage.removeItem("logged");
    localStorage.removeItem("fotoPerfil"); 
    window.location.href = "/pages/login.html";
}


const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");

userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});


const botaoUpload = document.querySelector(".add-image");
const inputImagem = document.getElementById("imagem");
const preview = document.querySelector(".imagem-preview");


const imagemSalva = localStorage.getItem("fotoPerfil");
if (imagemSalva) {
    preview.innerHTML = `<img src="${imagemSalva}" style="max-width: 100%; max-height: 600px;"/>`;


    const profileIcon = document.querySelector(".user-profile img");
    if (profileIcon) {
        profileIcon.src = imagemSalva;
    }
}

botaoUpload.addEventListener("click", function () {
    inputImagem.click();
});

inputImagem.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imagemBase64 = e.target.result;
            preview.innerHTML = `<img src="${imagemBase64}" style="max-width: 100%; max-height: 600px;"/>`;

           
            localStorage.setItem("fotoPerfil", imagemBase64);

           
            const profileIcon = document.querySelector(".user-profile img");
            if (profileIcon) {
                profileIcon.src = imagemBase64;
            }
        };
        reader.readAsDataURL(file);
    }
});

const fotoPerfil = localStorage.getItem("fotoPerfil") || "/img/Design_sem_nome-removebg-preview.png";
const userprofileimg = document.querySelector(".user-profile");
userprofileimg.innerHTML = `<img src="${fotoPerfil}" alt="User Profile"/>`;