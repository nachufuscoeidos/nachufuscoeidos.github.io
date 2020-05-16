function loaderSlider(fuente, containerUl) {
    let fotos = [];

    fetch("img/" + fuente)
    .then(function(response) {
        return response.text();
    })
    .then(function(archivosString) {
        let archivos = archivosString.split(",");

        for (let i = 0; i < archivos.length; i++) {
            fotos.push(archivos[i].trim());
        }

        fillUlSlider(fotos, containerUl);
    })
}

function fillUlSlider(fotos, containerUl) {
    let ul = document.querySelector(containerUl);

    ul.innerHTML = ""

    for (let i = 0; i < fotos.length; i++) {
        let li = "<li>"
        li += "<img src='" + fotos[i] + "'>"
        li += "</li>"

        ul.innerHTML += li;
    }
}

function loaderSlideshow(fuentes, containerUl) {

}