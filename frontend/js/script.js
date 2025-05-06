const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");
userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});

const Books = JSON.parse(localStorage.getItem("Books")) || [];
const booksGrid = document.querySelector(".books-grid");
const infocard = document.querySelector(".container");
const maincontent = document.querySelector('.main-content');

function getBooks() {
    booksGrid.innerHTML = "";

    Books.forEach((book) => {
        const div = document.createElement("div");
        div.classList.add("book-card");

        div.innerHTML = `
            <div class="book-image">
                <img src="${book.imagem}" alt="">
            </div>
            <div class="book-details">
                <div>
                    <div class="book-title">${book.nome}</div>
                    <div class="book-price">R$${book.preco}</div>
                    <div class="category">${book.categoria}</div>
                </div>
                <div class="book-tags">
                    <span class="book-tag" style="background-color: #e8f4e8; color: #4caf50;">${book.estado}</span>
                </div>
                <div class="book-seller">Vendedor: João Silva</div>
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
    infocard.innerHTML = `
        <button class="backcontent">← Voltar para a página inicial</button>
        <div class="book-details-info">
            <div class="book-image-info">
                <img src="${book.imagem}" alt="${book.nome}">
            </div>
            <div class="book-info">
                <div class="title-price">
                    <h1 class="nameBook">${book.nome}</h1>
                    <span class="price">R$ ${book.preco}</span>
                </div>
                <div class="tags">
                    <span class="categ">${book.categoria}</span>
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
                        <strong>João Silva</strong><br>
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
        getBooks();
    });
}

getBooks();

const logged = JSON.parse(localStorage.getItem("logged")) || [];
const userName = document.querySelector(".user-name");
const userEmail = document.querySelector(".user-email");

logged.forEach(user => {
    userName.innerHTML = `${user.name}`;
    userEmail.innerHTML = `${user.email}`;
});

function exituser() {
    let logged = [];
    localStorage.removeItem("logged");
    localStorage.setItem("logged", JSON.stringify(logged));
    window.location.href = "/pages/login.html";
}


const search = document.querySelector('.search-input');
const btnsearch = document.querySelector(".btnsearch");

btnsearch.addEventListener("click", () => {
    const termo = search.value.toLowerCase().trim();

    const resultado = Books.filter(book =>
        book.nome.toLowerCase().includes(termo)
    );

    exibirLivros(resultado);
});

search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btnsearch.click();
    }
});

function exibirLivros(lista) {
    booksGrid.innerHTML = "";

    if (lista.length === 0) {
        booksGrid.innerHTML = "<p>Nenhum livro encontrado.</p>";
        return;
    }

    lista.forEach((book) => {
        const div = document.createElement("div");
        div.classList.add("book-card");

        div.innerHTML = `
            <div class="book-image">
                <img src="${book.imagem}" alt="">
            </div>
            <div class="book-details">
                <div>
                    <div class="book-title">${book.nome}</div>
                    <div class="book-price">R$${book.preco}</div>
                    <div class="category">${book.categoria}</div>
                </div>
                <div class="book-tags">
                    <span class="book-tag" style="background-color: #e8f4e8; color: #4caf50;">${book.estado}</span>
                </div>
                <div class="book-seller">Vendedor: João Silva</div>
            </div>`;

        div.addEventListener("click", () => {
            readBook(book);
            infocard.style.display = "block";
            maincontent.style.display = "none";
        });

        booksGrid.appendChild(div);
    });
}
