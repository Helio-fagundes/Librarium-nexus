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


const formimg = document.querySelector(".formulario");
const inputimg = document.querySelector("#imagem");
const inputTitle = document.querySelector("#titulo");
const description = document.querySelector("#descricao");
const precoinput = document.querySelector("#preco");
const category = document.querySelector('#category');
const estado = document.querySelector("#estado");
const btncancel = document.querySelector(".cancelar");
const public = document.querySelector(".publicar");

function refreshpage(){
    window.location.href = "/index.html"
}
 
public.addEventListener("click", (e) => {
    e.preventDefault();

    function getvalue(input) {
        return input.value;
    }

    const livro = {
        nome: getvalue(inputTitle),
        descricao: getvalue(description),
        preco: parseFloat(getvalue(precoinput)),
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
        .then(res => {
            console.log("Status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Resposta do servidor:", data);
            alert("Livro adicionado com sucesso");
        })
        .catch(err => {
            console.error("Erro ao adicionar o livro", err);
        });

function salvarImagem() {
    const logged  = JSON.parse(localStorage.getItem("logged")) || {};
    const idUsuario = logged ? logged.id_usuario : null;
    const input = document.getElementById('imagem');
    const file = input.files[0];

    if (file && idUsuario) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const base64String = reader.result;
            const imguser = JSON.parse(localStorage.getItem("imagem")) || {};
            const imagem = {
                imagem: base64String,
                id_usuario: idUsuario,
                id_livro: livro.id
            };
            localStorage.setItem("imagem", JSON.stringify(imagem));

            console.log("Imagem salva com sucesso!");
        };
        reader.readAsDataURL(file);
    } else {
        console.log("Nenhuma imagem selecionada ou usuário não está logado.");
    }
}
    salvarImagem();

   refreshpage()
});


