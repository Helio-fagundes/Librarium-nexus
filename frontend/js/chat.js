const userprofile = document.querySelector(".user-profile");

const drop = document.querySelector(".dropuser");

const datetext = document.querySelector("#date");

const newdate = new Date();
const gethours = newdate.getHours();
const getmin = newdate.getMinutes();
console.log(gethours)

datetext.innerHTML = `${gethours}:${getmin}`



userprofile.addEventListener("click", () => {
    drop.classList.toggle("userflex");
});




