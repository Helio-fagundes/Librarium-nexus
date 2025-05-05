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


const RegisName = document.querySelector("#RegisName");
const RegisEmail = document.querySelector("#RegisEmail");
const RegisCPF = document.querySelector("#RegisCPF");
const RegisTel = document.querySelector("#RegisTel");
const Regispassword = document.querySelector("#Regispassword");
const RegisconfirPass = document.querySelector("#RegisconfirPass").value;
const Regisconfirmbtn = document.querySelector("#Regisconfirmbtn");
const formresgister = document.querySelector("#formregister");

const USER = JSON.parse(localStorage.getItem("USUARIOS")) || [];

function setuser(Nome, Email, CPF, Telefone, Senha){
    const user = {
        Nome: Nome,
        Email: Email,
        CPF: CPF,
        Telefone: Telefone,
        Senha: Senha,
    }
    USER.push(user);
    localStorage.setItem("usuarios",JSON.stringify(USER));
    console.log(USER);
}
/* 
formregister.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
        Nome: getValue(RegisName),
        Email: getValue(RegisEmail),
        CPF: getValue(RegisCPF),
        Tel: getValue(RegisTel),
        Senha: getValue(Regispassword),
        SenhaConfirm: getValue(formresgister),
    }

    console.log(formData)
    setuser(formData);

}) */