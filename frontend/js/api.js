const URL = "https://dummyjson.com/posts";

const list = document.querySelector("#book");


async function getAPI() {
    const resp = await fetch(URL);
    if (resp.status === 200) {
        const object = await resp.json();
        const posts = object.posts;
        const array = [];
        array.push(object);
        console.log(posts);
        posts.forEach(post => {
            const div = document.createElement("div");
            list.appendChild(div);
            div.innerHTML = `<p>${post.title}</p> <br> <p>${post.tags}</p>`
        })
    }
}




getAPI();
