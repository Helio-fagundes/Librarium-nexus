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

function setuser(name, email, CPF, tel, password){
    const user = {
        name: name,
        email: email,
        CPF: CPF,
        tel: tel,
        password: password
    };
    USER.push(user);
    localStorage.setItem("USUARIOS",JSON.stringify(USER));
    console.log(USER);
}


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
    
    let getUser = USER.find(user => {
        return user.email == getValue(emailInput) && user.password == getValue(passwordInput);
    });


    if (getUser) {
        alert(`SEJA BEM VINDO ${getUser.name} `);
        logged = [getUser];
        localStorage.setItem("logged", JSON.stringify(logged))
        direct();
    } else {
        alert("Email ou senha incorretos.");
    }
});





/* REGISTER */
formregister.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
        name: getValue(RegisName),
        email: getValue(RegisEmail),
        CPF: getValue(RegisCPF),
        tel: getValue(RegisTel),
        password: getValue(Regispassword),
    }
    

 let exist = USER.find(user => {
   return getValue(RegisName) === user.name && getValue(RegisEmail) === user.email;
 })

 let cpf = USER.find(user => {
    return getValue(RegisCPF) === user.CPF;
 })

 let tel = USER.find(user => {
    return getValue(RegisTel) === user.tel;
 })



    if (exist) {
        alert("Nome ou email ja existe");
    }else if(cpf){
        alert("esse cpf ja foi cadastrado");
    }else if (tel) {
        alert("telefone ja cadatrado");
    }else if (getValue(Regispassword) !== getValue(RegisconfirPass)) {
        alert("A senha nao estao iguais");
    }else{
        alert("Cadastro concluido");
        setuser(formData.name, formData.email, formData.CPF, formData.tel, formData.password);
    }

    RegisName.value = "";
    RegisEmail.value = "";
    RegisCPF.value = "";
    RegisTel.value = "";
    Regispassword.value = "";
    RegisconfirPass.value = "";



})