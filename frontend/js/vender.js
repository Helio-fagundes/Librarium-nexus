const imagemInput = document.getElementById('imagem');
const preview = document.querySelector('.imagem-preview');
const usuarioLogado = JSON.parse(localStorage.getItem("logged"));

// Variável para armazenar a imagem em base64
let base64Image = "";

imagemInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            base64Image = e.target.result;  // Salva o base64 aqui
            preview.innerHTML = `<img src="${base64Image}" style="max-width: 100%; max-height: 600px;"/>`;
        };
        reader.readAsDataURL(file);
    }
});

const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");
userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});

const inputTitle = document.querySelector("#titulo");
const description = document.querySelector("#descricao");
const precoinput = document.querySelector("#preco");
const category = document.querySelector('#category');
const estado = document.querySelector("#estado");
const publicBtn = document.querySelector(".publicar");

function refreshpage() {
    window.location.href = "/index.html";
}

publicBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (inputTitle.value.trim() === "") {
        alert("O título é obrigatório.");
        inputTitle.focus();
        return;
    }

    if (description.value.trim() === "") {
        alert("A descrição é obrigatória.");
        description.focus();
        return;
    }

    const preco = parseFloat(precoinput.value);
    if (isNaN(preco) || preco <= 0) {
        alert("Digite um preço válido.");
        precoinput.focus();
        return;
    }

    if (category.value === "" || category.value === "selecione") {
        alert("Selecione uma categoria.");
        category.focus();
        return;
    }

    if (estado.value === "" || estado.value === "selecione") {
        alert("Selecione um estado.");
        estado.focus();
        return;
    }

    if (!base64Image) {
        alert("Por favor, selecione uma imagem.");
        return;
    }

    function getvalue(input) {
        return input.value;
    }

    const livro = {
        imagem_url: [base64Image],
        nome: getvalue(inputTitle),
        descricao: getvalue(description),
        preco: preco,
        id_categorias: parseInt(getvalue(category)),
        id_autor: 1 
    };

    fetch("http://54.173.229.152:8080/livros", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(livro)
    })
        .then(res => res.json())
        .then(data => {
            console.log("Resposta do servidor:", data);
            alert("Livro adicionado com sucesso");
            refreshpage();
        })
});

// Config user
let logged = JSON.parse(localStorage.getItem("logged")) || {};
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

let fotoPerfil = localStorage.getItem("fotoPerfil");
const userprofileimg = document.querySelector(".user-profile");
userprofileimg.innerHTML = `<img src="${fotoPerfil}" alt="User Profile"/>`;
