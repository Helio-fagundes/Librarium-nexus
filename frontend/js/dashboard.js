const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");

userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});


const totalbooks = document.querySelector(".valor");
const visu = document.querySelector(".visu");


async function getBooks() {
    try {
        const response = await fetch("http://54.173.229.152:8080/livros");

        if (response.status === 200) {
            const books = await response.json(); 
            listbook(books);
        } else {
            alert("Erro na API");
        }
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
    }

}


function listbook(books) {
    const listbookContainer = document.querySelector(".book-card");
    listbookContainer.innerHTML = ""; 
    books.forEach((livro) => {
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
                <p>${livro.id_livros}</p>
            </div>
            <div class="book-actions">
                <button class="view-btn">Visualizar</button>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn" onclick="del(${livro.id_livros})">Excluir</button>
            </div>
        `;
        div.classList.add("book-list");
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
            getBooks();
        } else {
            alert("Erro ao excluir o livro.");
        }
    } catch (error) {
        console.error("Erro ao excluir o livro:", error);
    }
}


getBooks();
