const imagemInput = document.getElementById('imagem');
const preview = document.querySelector('.imagem-preview');
const usuarioLogado = JSON.parse(localStorage.getItem("logged"));


imagemInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 600px;"/>`;
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
const public = document.querySelector(".publicar");

function refreshpage() {
    window.location.href = "/index.html";
}


function gerarIdLivro() {
    const livros = JSON.parse(localStorage.getItem("livros")) || [];
    return livros.length > 0 ? livros[livros.length - 1].id_livro + 1 : 1;
}


public.addEventListener("click", (e) => {
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


    alert("Formulário válido! Pronto para ser enviado.");


    function getvalue(input) {
        return input.value;
    }

    const idLivro = gerarIdLivro();

    const livro = {
        id_livro: idLivro,
        nome: getvalue(inputTitle),
        descricao: getvalue(description),
        preco: parseFloat(getvalue(precoinput)),
        id_categorias: parseInt(getvalue(category)),
        id_autor: 1
    };


    const livros = JSON.parse(localStorage.getItem("livros")) || [];
    livros.push(livro);
    localStorage.setItem("livros", JSON.stringify(livros));


    salvarImagem(idLivro);


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
        .catch(err => {
            console.error("Erro ao adicionar o livro:", err);
            alert("Erro ao adicionar o livro. Mas ele foi salvo localmente.");
            refreshpage();
        });
});


function salvarImagem(idLivro) {
    const logged = JSON.parse(localStorage.getItem("logged")) || {};
    const idUsuario = logged ? logged.id_usuario : null;
    const input = document.getElementById('imagem');
    const file = input.files[0];
    const estadoLivro = document.getElementById("estado").value;

    if (file && idUsuario) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const base64String = reader.result;


            const livros = JSON.parse(localStorage.getItem("livros")) || [];
            const livroIndex = livros.findIndex(livro => livro.id_livro === idLivro);

            if (livroIndex !== -1) {
                livros[livroIndex].imagem = base64String;
                livros[livroIndex].estado = estadoLivro;
                localStorage.setItem("livros", JSON.stringify(livros));
                console.log("Imagem salva com sucesso no livro!", livros[livroIndex]);
            }
        };
        reader.readAsDataURL(file);
    } else {
        console.log("Nenhuma imagem selecionada ou usuário não está logado.");
    }
}

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