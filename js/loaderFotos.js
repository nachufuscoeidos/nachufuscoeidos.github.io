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

        console.log(fotos);
        //fetch("https://raw.githubusercontent.com/nachufuscoeidos/recursos_abrazo/master/" + fuente)
    })
}

function loaderSlideshow(fuentes, containerUl) {

}