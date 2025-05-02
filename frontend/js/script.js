const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");

const cards = document.querySelector(".book-card");

const infocard = document.querySelector("#book-click");

const maincontent = document.querySelector('.main-content');

const backpage = document.querySelector(".backpage");

cards.addEventListener("click", () => {
    if (infocard.style.display === "") {
        infocard.style.display = "flex";
        maincontent.style.display = "none";
    }
})

backpage.addEventListener("click", () => {
    if (infocard.style.display === "flex") {
        infocard.style.display = "none"
        maincontent.style.display = "block";
    }
})


userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});


