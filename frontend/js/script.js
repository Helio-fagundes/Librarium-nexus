const api = "http://localhost:3000/livros";
const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");

userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});


const apiUrl = "http://localhost:3000/livros";
const livrosContainer = document.querySelector('.books-grid');

function exibirLivros(livros) {
    livrosContainer.innerHTML = '';
    livros.forEach(livro => {
        const livroElement = document.createElement('div');
        livroElement.classList.add('book-card');

        livroElement.innerHTML = `
            <div class="book-image">
                <img src="${livro.imagem}" alt="${livro.titulo}">
            </div>
            <div class="book-details">
                <div class="book-title">${livro.titulo}</div>
                <div class="book-price">R$ ${livro.preco.toFixed(2)}</div>
                  <div class="category"><p>${livro.categoria}</p></div>
                <div class="book-tags">
                    <span class="book-tag" style="background-color: #e8f4e8; color: #4caf50;">${livro.estado || 'Novo'}</span>
                </div>
                <div class="book-seller">Vendedor: ${livro.autor}</div>
                
            </div>
        `;
        livrosContainer.appendChild(livroElement);
    });
}

axios.get(apiUrl)
    .then(response => {
        exibirLivros(response.data);
    })
    .catch(error => {
        console.error("Erro ao carregar livros:", error);
        livrosContainer.innerHTML = "<p>Erro ao carregar livros.</p>";
    });
//ESTOU UTILIZANDO O AXIOS PARA PEGAR API
