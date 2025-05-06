const URL = "http://localhost:8080/usuario/login";


async function getAPI() {
    const resp = await fetch(URL);
    if (resp.status === 200) {
        const object = await resp.json();
       console.log(object)
    }
}








getAPI();
