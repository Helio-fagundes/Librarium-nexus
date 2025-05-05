
const imagemInput = document.getElementById('imagem');
const preview = document.querySelector('.imagem-preview');

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




/* FORM BOOK ADD IMAGE */
const formimg = document.querySelector(".formulario");
const inputimg = document.querySelector("#imagem");
const inputTitle = document.querySelector("#titulo");
const description = document.querySelector("#descricao");
const precoinput = document.querySelector("#preco");
const category = document.querySelector('#category');
const estado = document.querySelector("#estado");
const btncancel = document.querySelector(".cancelar");
const public = document.querySelector(".publicar");


public.addEventListener("click", () => {
    const file = inputimg.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const imagemBase64 = e.target.result;

        const newBook = {
            categoria: category.value,
            nome: inputTitle.value,
            preco: parseFloat(precoinput.value),
            imagem: imagemBase64,
            estado: estado.value,
            descricao: description.value
        };

        let books = JSON.parse(localStorage.getItem("Books")) || [];
        books.push(newBook);
        localStorage.setItem("Books", JSON.stringify(books));

        alert("Livro adicionado com sucesso");
    };

    if (file) {
        reader.readAsDataURL(file); 
    } else {
        alert("Selecione uma imagem antes de publicar.");
    }
});