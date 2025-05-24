let logged = JSON.parse(localStorage.getItem("logged"));

const userName = document.querySelector(".user-name");
const userEmail = document.querySelector(".user-email");
const completename = document.querySelector("#complete-name");
const username = document.querySelector("#user-name");
const email = document.querySelector("#email");
const tel = document.getElementById("telefone");

if (!logged || !logged.id_usuario) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/pages/login.html";
}

if (logged) {
    userName.innerHTML = logged.nome;
    userEmail.innerHTML = logged.email;
    tel.value = logged.tel;
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

// Função para atualizar os dados do usuário com fetch
/* function atualizarUsuario() {
    const dadosAtualizados = {
        id_usuario: logged.id_usuario,
        nome: completename.value,
        email: email.value,
        tel: tel.value
    };

    fetch(`http://54.173.229.152:8080/usuario/${logged.id_usuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao atualizar usuário.");
        }
        return response.json();
    })
    .then(data => {
        alert("Dados atualizados com sucesso!");
        localStorage.setItem("logged", JSON.stringify(data));

        // Atualiza informações visuais
        userName.innerHTML = data.nome;
        userEmail.innerHTML = data.email;
    })
    .catch(error => {
        console.error("Erro na atualização:", error);
        alert("Erro ao atualizar os dados.");
    });
}
 */
// Adiciona imagem padrão de perfil se não houver
const fotoPerfil = localStorage.getItem("fotoPerfil") || "/img/Design_sem_nome-removebg-preview.png";
const userprofileimg = document.querySelector(".user-profile");
userprofileimg.innerHTML = `<img src="${fotoPerfil}" alt="User Profile"/>`;
