const imagemInput = document.getElementById('imagem');
const preview = document.querySelector('.imagem-preview');
const usuarioLogado = JSON.parse(localStorage.getItem("logged"));

let selectedFile = null;

// Captura e preview da imagem
imagemInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        if (!file.type.startsWith("image/")) {
            alert("Por favor, selecione um arquivo de imagem válido.");
            return;
        }

        selectedFile = file;

        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 600px;"/>`;
        };
        reader.readAsDataURL(file);
    }
});

// Menu do usuário
const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");
userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});

// Inputs
const inputTitle = document.querySelector("#titulo");
const description = document.querySelector("#descricao");
const precoinput = document.querySelector("#preco");
const category = document.querySelector('#category');
const estado = document.querySelector("#estado");
const publicBtn = document.querySelector(".publicar");
const form = document.querySelector(".formulario");

function refreshpage() {
    window.location.href = "/index.html";
}

// Publicar livro
form.addEventListener("submit", (e) => {
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

    if (!selectedFile) {
        alert("Por favor, selecione uma imagem.");
        return;
    }

    const formData = new FormData();
    formData.append("imagem", selectedFile);
    formData.append("nome", inputTitle.value.trim());
    formData.append("descricao", description.value.trim());
    formData.append("preco", preco);
    formData.append("id_categorias", parseInt(category.value));
    formData.append("id_autor", usuarioLogado?.id_usuario || null);

    fetch("http://54.173.229.152:8080/livros", {
        method: "POST",
        body: formData
    })
    .then(async res => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        return text;
    })
    .then(data => {
        alert("Livro adicionado com sucesso");
        refreshpage();
    })
    .catch(error => {
        console.error("Erro detalhado:", error.message);
        alert("Erro ao cadastrar o livro. Tente novamente.");
    });
});

// dados do usuario logado
const userName = document.querySelector(".user-name");
const userEmail = document.querySelector(".user-email");
const logged = usuarioLogado || {};

if (logged) {
    userName.innerHTML = `${logged.nome}`;
    userEmail.innerHTML = `${logged.email}`;
} else {
    console.log("Nenhum usuário logado.");
}

//  foto de perfil
const fotoPerfil = localStorage.getItem("fotoPerfil") || "/img/Design_sem_nome-removebg-preview.png";
const userprofileimg = document.querySelector(".user-profile");

if (fotoPerfil) {
    userprofileimg.innerHTML = `<img src="${fotoPerfil}" alt="User Profile"/>`;
} else {
    userprofileimg.innerHTML = `<img src="/default-user.png" alt="User Profile"/>`;
}

// logout
function exituser() {
    localStorage.removeItem("logged");
    window.location.href = "/pages/login.html";
}
