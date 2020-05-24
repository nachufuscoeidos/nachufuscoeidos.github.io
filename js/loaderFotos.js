function loaderSlider(fuente, idDOM) {
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

        fillUlSlider(fotos, idDOM);
    })
}

function fillUlSlider(fotos, idDOM) {
    let ul = document.querySelector("ul.slider-" + idDOM);
    let loader = document.querySelector(".loader-" + idDOM);

    loader.style.display = "none";

    ul.innerHTML = "";

    for (let i = 0; i < fotos.length; i++) {
        let li = "<li>"
        li += "<img src='img/" + fotos[i] + "?" + Math.random() + "'>"
        li += "</li>"

        ul.innerHTML += li;
    }
}

function loaderSlideshow(fuentes, idDOM) {

}