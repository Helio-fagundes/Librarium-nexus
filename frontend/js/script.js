const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");
userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});


const logged = JSON.parse(localStorage.getItem("logged"));

const URL = "http://54.173.229.152:8080/livros";
const booksGrid = document.querySelector(".books-grid");
const infocard = document.querySelector(".container");
const maincontent = document.querySelector('.main-content');

let Books = [];
const categorias = [
    { id: 1, nome: "Tecnologia" }, { id: 2, nome: "Ficção" }, { id: 3, nome: "Romance" },
    { id: 4, nome: "Aventura" }, { id: 5, nome: "Biografia" }, { id: 6, nome: "Clássicos" },
    { id: 7, nome: "Ciência" }, { id: 8, nome: "Ciência Ficção" }, { id: 9, nome: "Desenvolvimento Pessoal" },
    { id: 10, nome: "Direito" }, { id: 11, nome: "Educação" }, { id: 12, nome: "Espiritualidade" },
    { id: 13, nome: "Fantasia" }, { id: 14, nome: "Gastronomia" }, { id: 15, nome: "Histórico" },
    { id: 16, nome: "Infantil" }, { id: 17, nome: "Jovem Adulto" }, { id: 18, nome: "Mistério" },
    { id: 19, nome: "Negócios" }, { id: 20, nome: "Poesia" }, { id: 21, nome: "Religião" },
    { id: 22, nome: "Suspense" }, { id: 23, nome: "Terror" }, { id: 24, nome: "Viagens" }
];

async function getBooks() {
    try {
        const resp = await fetch(URL);
        const data = await resp.json();
        if (resp.status === 200) {
            console.log("API funcionando");
            Books = data;
            exibirLivros(Books);
            console.log("Todos os livros carregados:", Books);

            if (logged && logged.id) {
                const meusLivros = Books.filter(book => book.id_usuario === logged.id);
                console.log("Meus livros:", meusLivros);
            }
        } else {
            console.log("Erro ao buscar livros");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

const estadosLivro = [
    { value: "bom", label: "Bom" },
    { value: "ótimo", label: "Ótimo" },
    { value: "novo", label: "Novo" },
    { value: "usado", label: "Usado" }
];


function exibirLivros(lista) {
    booksGrid.innerHTML = "";
    if (lista.length === 0) {
        booksGrid.innerHTML = "<p>Nenhum livro encontrado.</p>";
        return;
    }
    lista.forEach(book => {
        const categoria = categorias.find(cat => cat.id === book.id_categorias);
        const div = document.createElement("div");
        let storageimg = JSON.parse(localStorage.getItem("imagem")) || {};
        
        div.classList.add("book-card");
        div.innerHTML = `
            <div class="book-image">
                <img src="${storageimg.imagem}" alt="">
            </div>
            <div class="book-details">
                <div>
                    <div class="book-title">${book.nome}</div>
                    <div class="book-price">R$${book.preco}</div>
                    <div class="category">${categoria ? categoria.nome : 'Categoria desconhecida'}</div>
                </div>
                <div class="book-tags">
                    <span class="book-tag" style="background-color: #e8f4e8; color: #4caf50;">${book.estado}</span>
                </div>
                <div class="book-seller">Vendedor: ${logged.nome}</div>
            </div>`;
        div.addEventListener("click", () => {
            readBook(book);
            infocard.style.display = "block";
            maincontent.style.display = "none";
        });

        booksGrid.appendChild(div);
    });
}

function readBook(book) {
    const categoria = categorias.find(cat => cat.id === book.id_categorias);
    infocard.innerHTML = `
        <button class="backcontent">← Voltar para a página inicial</button>
        <div class="book-details-info">
            <div class="book-image-info">
                <img src="" alt="${book.nome}">
            </div>
            <div class="book-info">
                <div class="title-price">
                    <h1 class="nameBook">${book.nome}</h1>
                    <span class="price">R$ ${book.preco}</span>
                </div>
                <div class="tags">
                    <div class="category">${categoria ? categoria.nome : 'Categoria desconhecida'}</div>
                </div>
                <div class="views">
                    <span class="condition">${book.estado}</span>
                </div>
                <div class="description">
                    <h3>Descrição</h3>
                    <p>${book.descricao}</p>
                </div>
                <div class="seller">
                    <div class="avatar">
                        <img src="img/pessoa.png" alt="Foto do vendedor">
                    </div>
                    <div>
                        <strong></strong><br>
                        <small>Vendedor</small>
                    </div>
                </div>
                <button class="message-btn">Enviar mensagem</button>
            </div>
        </div>
    `;

    document.querySelector(".backcontent").addEventListener("click", () => {
        infocard.style.display = "none";
        maincontent.style.display = "block";
        exibirLivros(Books);
    });
}

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

const search = document.querySelector('.search-input');
const btnsearch = document.querySelector(".btnsearch");

btnsearch.addEventListener("click", () => {
    const termo = search.value.toLowerCase().trim();
    const resultado = Books.filter(book =>
        book.nome.toLowerCase().includes(termo) ||
        book.descricao.toLowerCase().includes(termo) ||
        categorias.find(cat => cat.id === book.id_categorias)?.nome.toLowerCase().includes(termo)
    );
    exibirLivros(resultado);
});

search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btnsearch.click();
    }
});

getBooks();
