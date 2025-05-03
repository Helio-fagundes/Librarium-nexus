const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");

const cards = document.querySelector(".book-card");

const infocard = document.querySelector(".container");

const maincontent = document.querySelector('.main-content');

const backpage = document.querySelector(".back");



cards.addEventListener("click", () => {
    if (infocard.style.display === "none" || infocard.style.display === "") {
        infocard.style.display = "flex";
        maincontent.style.display = "none";
    }
})

backpage.addEventListener("click", () => {
    if (infocard.style.display === "flex") {
        infocard.style.display = "none";
        maincontent.style.display = "block";
    }
})

userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});

const addbookdiv = document.querySelector(".books-grid");

function getBooks() {
    const Books = JSON.parse(localStorage.getItem("Books")) || [];

    Books.forEach((book) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <div class="book-card">
                <div class="book-image">
                    <img src="${book.imagem}" alt="">
                </div>
                <div class="book-details">
                    <div>
                        <div class="book-title">${book.nome}</div>
                        <div class="book-price">R$${book.preco}</div>
                    </div>
                    <div class="book-tags">
                        <span class="book-tag" style="background-color: #e8f4e8; color: #4caf50;">${book.estado}</span>
                    </div>
                    <div class="book-seller">Vendedor: João Silva</div>
                </div>
            </div>
        `;

        addbookdiv.appendChild(div);
    });
}

getBooks();

