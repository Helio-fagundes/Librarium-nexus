const btnback = document.querySelector(".btnregister");
const backlogin = document.querySelector(".btnlogin");
const formlogin = document.querySelector(".form-container");
const formregister = document.querySelector(".form-register");

// Campos de registro
const RegisName = document.querySelector("#RegisName");
const RegisEmail = document.querySelector("#RegisEmail");
const RegisCPF = document.querySelector("#RegisCPF");
const RegisTel = document.querySelector("#RegisTel");
const Regispassword = document.querySelector("#Regispassword");
const RegisconfirPass = document.querySelector("#RegisconfirPass");
const registerForm = document.querySelector("#formregister");

// Campos de login
const emailInput = document.querySelector("#Email");
const passwordInput = document.querySelector("#password");
const btnLogin = document.querySelector(".Confirm-login");

// Função para pegar valor do input e remover espaços
function getValue(input) {
    return input.value.trim();
}

// Função para redirecionar para index.html
function direct() {
    window.location.href = "/index.html";
}

// Alternar entre login e registro
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

// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = soma % 11;
    let dig1 = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf.charAt(9)) !== dig1) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = soma % 11;
    let dig2 = resto < 2 ? 0 : 11 - resto;

    return parseInt(cpf.charAt(10)) === dig2;
}

// Validação de telefone
function validarTelefone(telefone) {
    telefone = telefone.replace(/[^\d]+/g, '');
    return telefone.length >= 10 && telefone.length <= 11;
}

// Validação simples de registro
function validateRegister(usuario) {
    if (!usuario.nome || !usuario.email || !usuario.senha || !usuario.cpf || !usuario.tel) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!validarCPF(usuario.cpf)) {
        alert("CPF inválido.");
        return false;
    }

    if (!validarTelefone(usuario.tel)) {
        alert("Telefone inválido.");
        return false;
    }

    if (usuario.senha !== getValue(RegisconfirPass)) {
        alert("As senhas não conferem.");
        return false;
    }

    return true;
}

// Registro
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = {
        nome: getValue(RegisName),
        email: getValue(RegisEmail),
        senha: getValue(Regispassword),
        cpf: getValue(RegisCPF).replace(/[^\d]+/g, ''),
        tel: getValue(RegisTel).replace(/[^\d]+/g, '')
    };

    if (!validateRegister(usuario)) return;

    fetch('http://54.173.229.152:8080/usuario/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(usuario)
    })
    .then(async response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Erro ao cadastrar usuário');
            });
        }
        return response.json();
    })
    .then(data => {
        alert('Usuário cadastrado com sucesso!');
        console.log('Usuário criado:', data);
        registerForm.reset();
        backlogin.click();
    })
    .catch(error => {
        alert(`Erro ao cadastrar usuário: ${error.message}`);
        console.error(error);
    });
});

// Login
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    const usuario = {
        email: getValue(emailInput),
        senha: getValue(passwordInput)
    };

    if (!usuario.email || !usuario.senha) {
        alert("Por favor, preencha email e senha.");
        return;
    }

    fetch('http://54.173.229.152:8080/usuario/login', {
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
        if (!response.ok) {
            throw new Error('Erro na autenticação');
        }
        return await response.json();
    })
    .then(user => {
        alert('Login realizado com sucesso!');
        console.log('Usuário logado:', user);
        localStorage.setItem("logged", JSON.stringify(user));
        direct();
    })
    .catch(error => {
        alert(error.message);
        console.error(error);
    });
});
