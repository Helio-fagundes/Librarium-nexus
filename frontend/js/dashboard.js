const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");
userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});

const fotoPerfil = localStorage.getItem("fotoPerfil") || "/img/Design_sem_nome-removebg-preview.png";
const userprofileimg = document.querySelector(".user-profile");

let logged = JSON.parse(localStorage.getItem("logged"));
const userName = document.querySelector(".user-name");
const userEmail = document.querySelector(".user-email");

if (!logged || !logged.id_usuario) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/pages/login.html";
}

if (logged) {
    userName.innerHTML = `${logged.nome}`;
    userEmail.innerHTML = `${logged.email}`;
} else {
    console.log("Nenhum usuário logado.");
}

userprofile.innerHTML = `<img src="${fotoPerfil}" alt="User Profile"/>`;

let usuarios = [];

async function getuser() {
    try {
        const URL = "http://54.173.229.152:8080/usuario";
        const resp = await fetch(URL);
        const data = await resp.json();
        if (resp.status === 200) {
            console.log("API de Usuário Funcionando");
            usuarios = data;
        } else {
            console.log("Erro ao conectar à API de Usuários");
        }
    } catch (error) {
        console.error("Erro na Requisição de Usuários", error);
    }
}

function exituser() {
    localStorage.removeItem("logged");
    window.location.href = "/pages/login.html";
}

const totalbooks = document.querySelector(".valor");

async function getBooks() {
    try {
        const response = await fetch("http://54.173.229.152:8080/livros");

        if (response.status === 200) {
            const books = await response.json();

            // 🔍 Filtra os livros do usuário logado
            const filteredBooks = books.filter(livro => livro.id_autor === logged.id_usuario);

            listbook(filteredBooks);
        } else {
            alert("Erro na API de Livros");
        }
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
    }
}

function listbook(books) {
    const listbookContainer = document.querySelector(".book-card");
    totalbooks.innerHTML = `${books.length}`;
    listbookContainer.innerHTML = "";

    books.forEach((livro) => {
        const vendedor = usuarios.find(user => user.id_usuario === livro.id_autor) || { nome: "Desconhecido" };
        const div = document.createElement("div");
        div.classList.add("book-item", "book-list");

        div.innerHTML = `
            <div class="book-cover">
                <img src="${livro.imagem_url}" alt="Capa do livro">
            </div>
            <div class="book-info">
                <h3>${livro.nome}</h3>
                <p>${vendedor.nome}</p>
                <p>R$ ${livro.preco}</p>
                <p>0 visualizações</p>
            </div>
            <div class="book-actions">
                <button class="view-btn">Visualizar</button>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn" onclick="del(${livro.id_livros})">Excluir</button>
            </div>
        `;
        listbookContainer.appendChild(div);
    });
}

async function del(id_livros) {
    try {
        const response = await fetch(`http://54.173.229.152:8080/livros/${id_livros}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Livro excluído com sucesso!");
            getBooks(); // Recarrega os livros do usuário
        } else {
            alert("Erro ao excluir o livro.");
        }
    } catch (error) {
        console.error("Erro ao excluir o livro:", error);
    }
}

async function init() {
    await getuser();
    await getBooks();
}
init();
