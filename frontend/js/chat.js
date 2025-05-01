const userprofile = document.querySelector(".user-profile");

const drop = document.querySelector(".dropuser");

const datetext = document.querySelector("#date");


function GetDateTime() {
    const date = new Date();
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

datetext.innerHTML = GetDateTime();

userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});




