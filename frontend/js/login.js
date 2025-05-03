const btnback = document.querySelector(".btnregister");

const formlogin = document.querySelector(".form-container");

const formregister = document.querySelector(".form-register");

const backlogin = document.querySelector(".btnlogin");


btnback.addEventListener("click", () => {
    formlogin.classList.remove("flex");
    formlogin.classList.add("hidden");
    formregister.classList.remove("hidden");
    formregister.classList.add("flex");
});


backlogin.addEventListener("click", () => {
    formregister.classList.remove("flex");
    formregister.classList.add("hidden");
    formlogin.classList.remove("hidden");
    formlogin.classList.add("flex");
});