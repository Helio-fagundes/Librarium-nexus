const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");

userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});

const Books = JSON.parse(localStorage.getItem("Books")) || [];

const totalbooks = document.querySelector(".valor");
totalbooks.innerHTML = `${Books.length}`;

const visu = document.querySelector(".visu");
const click = JSON.parse(localStorage.getItem("click")) || 0;
visu.innerHTML = `${click}`;

function listbook() {
    const listbookContainer = document.querySelector(".book-card");
    listbookContainer.innerHTML = ""; 

    Books.forEach((livro, i) => { 
        const div = document.createElement("div");
        div.classList.add("book-item");
        div.innerHTML = `
            <div class="book-cover">
                <img src="${livro.imagem}" alt="Capa do livro">
            </div>
            <div class="book-info">
                <h3>${livro.nome}</h3>
                <p>${livro.autor}</p>
                <p>R$ ${livro.preco}</p>
                <p>${livro.visualizacoes} visualizações</p>
                <p>${livro.data}</p>
            </div>
            <div class="book-actions">
                <button class="view-btn">Visualizar</button>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn" onclick="del(${i})">Excluir</button>
            </div>
        `;
        div.classList.add("book-list")
        listbookContainer.appendChild(div);
    });
}

function del(i) {
    Books.splice(i, 1);
    localStorage.setItem("Books", JSON.stringify(Books));
    totalbooks.innerHTML = `${Books.length}`;
    click++; 
    localStorage.setItem("click", JSON.stringify(click));
    visu.innerHTML = `${click}`;
    listbook();
    alert("Livro excluído com sucesso!");
    setTimeout(() => {
        location.reload();
    }, 500);
}

listbook();
