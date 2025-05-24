const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");

userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});

const logged = JSON.parse(localStorage.getItem("logged"))
const usuarioLogado = JSON.parse(localStorage.getItem("logged"));

if (!logged || !logged.id_usuario) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/pages/login.html";
}

const fotoPerfil = localStorage.getItem("fotoPerfil") || "/img/Design_sem_nome-removebg-preview.png";
userprofile.innerHTML = `<img src="${fotoPerfil}" alt="User Profile"/>`;

const userName = document.querySelector(".user-name");
const userEmail = document.querySelector(".user-email");

if (logged) {
    if (userName) userName.innerHTML = `${logged.nome}`;
    if (userEmail) userEmail.innerHTML = `${logged.email}`;
} else {
    console.log("Nenhum usuário logado.");
}

const URL = "http://54.173.229.152:8080/livros";
const booksGrid = document.querySelector(".books-grid");
const infocard = document.querySelector(".container");
const maincontent = document.querySelector('.main-content');
const categoriesContainer = document.querySelector(".categories-container");

let usuarios = [];
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
            gerarCategorias();

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

async function getuser() {
    try {
        const resp = await fetch("http://54.173.229.152:8080/usuario");
        const data = await resp.json();
        if (resp.status === 200) {
            usuarios = data;
        } else {
            console.log("Erro ao conectar à API de Usuários");
        }
    } catch (error) {
        console.error("Erro na Requisição de Usuários", error);
    }
}

function exibirLivros(lista) {
    booksGrid.innerHTML = "";
    if (lista.length === 0) {
        booksGrid.innerHTML = "<p>Nenhum livro encontrado.</p>";
        return;
    }

    lista.forEach(book => {
        const categoria = categorias.find(cat => cat.id === book.id_categorias) || { nome: 'Categoria desconhecida' };
        const vendedor = usuarios.find(user => user.id_usuario === book.id_autor) || { nome: "Desconhecido", id_usuario: null };
        const div = document.createElement("div");
        div.classList.add("book-card");
        div.innerHTML = `
            <div class="book-image">
                <img src="${book.imagem_url}" alt="Imagem do livro">
            </div>
            <div class="book-details">
                <div>
                    <div class="book-title">${book.nome}</div>
                    <div class="book-price">R$${book.preco}</div>
                    <div class="category">${categoria.nome}</div>
                </div>
                <div class="book-tags"></div>
                <div class="book-seller">Vendedor: ${vendedor.nome}</div>
            </div>`;

        div.addEventListener("click", () => {
            readBook(book, vendedor);
            infocard.style.display = "block";
            maincontent.style.display = "none";
        });

        booksGrid.appendChild(div);
    });
}

function readBook(book, vendedor) {
    const categoria = categorias.find(cat => cat.id === book.id_categorias) || { nome: 'Categoria desconhecida' };
    infocard.innerHTML = `
        <button class="backcontent">← Voltar para a página inicial</button>
        <div class="book-details-info">
            <div class="book-image-info">
                <img src="${book.imagem_url}" alt="${book.nome}">
            </div>
            <div class="book-info">
                <div class="title-price">
                    <h1 class="nameBook">${book.nome}</h1>
                    <span class="price">R$ ${book.preco}</span>
                </div>
                <div class="tags"><div class="category">${categoria.nome}</div></div>
                <div class="description">
                    <h3>Descrição</h3>
                    <p>${book.descricao}</p>
                </div>
                <div class="seller">
                    <div class="avatar"><img src="${fotoPerfil}" alt="Foto do vendedor"></div>
                    <div>
                        <strong>${vendedor.nome}</strong><br>
                        <small>Vendedor</small>
                    </div>
                </div>
                <a href="/pages/chat.html">
                    <button class="message-btn" data-userid="${vendedor.id_usuario}">Enviar mensagem</button>
                </a>
            </div>
        </div>
    `;

    document.querySelector(".backcontent").addEventListener("click", () => {
        infocard.style.display = "none";
        maincontent.style.display = "block";
        exibirLivros(Books);
    });
    infocard.querySelector('.message-btn').addEventListener('click', (e) => {
        e.preventDefault();
        const userId = e.target.getAttribute('data-userid');
        let vendedores = JSON.parse(localStorage.getItem("chatUser"));
        vendedores = Array.isArray(vendedores) ? vendedores : [];

        if (!vendedores.some(v => v.id_usuario === vendedor.id_usuario)) {
            vendedores.push(vendedor);
            localStorage.setItem("chatUser", JSON.stringify(vendedores));
            console.log("Vendedores armazenados:", vendedores);
        }

        window.location.href = `/pages/chat.html?userId=${userId}`;
    });
}

function gerarCategorias() {
    categoriesContainer.innerHTML = '';

    const todasPill = document.createElement('div');
    todasPill.classList.add('category-pill', 'category-active');
    todasPill.textContent = 'Todas';
    categoriesContainer.appendChild(todasPill);

    categorias.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(cat => {
        const div = document.createElement('div');
        div.classList.add('category-pill', 'category-inactive');
        div.textContent = cat.nome;
        categoriesContainer.appendChild(div);
    });

    categoriesContainer.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            categoriesContainer.querySelectorAll('.category-pill').forEach(el => {
                el.classList.remove('category-active');
                el.classList.add('category-inactive');
            });

            pill.classList.add('category-active');
            pill.classList.remove('category-inactive');

            const categoriaSelecionada = pill.textContent;

            if (categoriaSelecionada === 'Todas') {
                exibirLivros(Books);
            } else {
                const livrosFiltrados = Books.filter(book => {
                    const cat = categorias.find(c => c.id === book.id_categorias);
                    return cat && cat.nome === categoriaSelecionada;
                });
                exibirLivros(livrosFiltrados);
            }
        });
    });
}

async function exituser() {
    try {
        await fetch("http://54.173.229.152:8080/logout", {
            method: "POST",
            credentials: "include"
        });
    } catch (e) {
        console.error("Erro ao encerrar sessão no servidor", e);
    }

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
    if (e.key === "Enter") btnsearch.click();
});

async function init() {
    await getuser();
    await getBooks();
}
init();
