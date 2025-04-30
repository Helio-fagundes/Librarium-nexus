
const imagemInput = document.getElementById('imagem');
const preview = document.querySelector('.imagem-preview');

imagemInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 600px;"/>`;
        };
        reader.readAsDataURL(file);
    }
});

const userprofile = document.querySelector(".user-profile");
const drop = document.querySelector(".dropuser");

userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});

