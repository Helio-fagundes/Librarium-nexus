const { response } = require("express");

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
// FORM LOGIN E REGISTER

const RegisName = document.querySelector("#RegisName");
const RegisEmail = document.querySelector("#RegisEmail");
const RegisCPF = document.querySelector("#RegisCPF");
const RegisTel = document.querySelector("#RegisTel");
const Regispassword = document.querySelector("#Regispassword");
const RegisconfirPass = document.querySelector("#RegisconfirPass");
const Regisconfirmbtn = document.querySelector("#Regisconfirmbtn");
const formresgister = document.querySelector("#formregister");

const USER = JSON.parse(localStorage.getItem("USUARIOS")) || [];


const emailInput = document.querySelector("#Email");
const passwordInput = document.querySelector("#password");
const btnLogin = document.querySelector(".Confirm-login");


/* GET VALUE */
function getValue(input){
    return input.value.trim();
}
///

function direct(){
    window.location.href = "/index.html";
}



let logged = JSON.parse(localStorage.getItem("logged")) || [];

/* LOGIN */
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    const usuario = {
        email: getValue(emailInput),
        senha: getValue(passwordInput)
    }



    fetch('http://localhost:8080/usuario/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(usuario) 
    })
    .then(async response => {
        if (response.status === 401) {
            throw new Error('Email ou senha incorretos');
        }
        return await response.json();
    })
    .then(user => {
        alert('Login realizado com sucesso!');
        console.log('Usuário logado:', user);
        direct();
    })
    .catch(error => {
        alert(error.message);
        console.error(error);
    });
});





/* REGISTER */
formregister.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = {
        nome: getValue(RegisName),
        email: getValue(RegisEmail),
        senha: getValue(Regispassword),
        cpf: getValue(RegisCPF),
        tel: getValue(RegisTel),
        
      };

      fetch('http://localhost:8080/usuario/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(usuario)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then(data => {
        alert('Usuário cadastrado com sucesso!');
        console.log('Usuário criado:', data);
      })
      .catch(error => {
        alert('Erro ao cadastrar usuário');
        console.error(error);
      });




    RegisName.value = "";
    RegisEmail.value = "";
    RegisCPF.value = "";
    RegisTel.value = "";
    Regispassword.value = "";
    RegisconfirPass.value = "";
})







