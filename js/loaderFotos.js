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

        fetch("https://raw.githubusercontent.com/nachufuscoeidos/recursos_abrazo/master/" + fuente)
        .then(function(response) {
            if (!response.ok) {
                // make the promise be rejected if we didn't get a 2xx response
                throw new Error("Not 2xx response")
            }
            return response.text();
        })
        .then(function(archivosStringGithub) {
            let archivosGithub = archivosStringGithub.split(",");

            for (let i = 0; i < archivosGithub.length; i++) {
                if (!fotos.includes(archivosGithub[i])) {
                    fotos.push(archivosGithub[i].trim());
                }
            }

            fillUlSlider(fotos, containerUl);
        })
        .catch(function(e) {
            console.log("Error accesing file in Github: " + fuente);
            console.log(e);
            
            fillUlSlider(fotos, containerUl);
        })
    })
}

function fillUlSlider(fotos, containerUl) {
    let ul = document.querySelector(containerUl);

    for (let i = 0; i < fotos.length; i++) {
        let li = "<li>"
        li += "<img src='" + fotos[i] + "'>"
        li += "</li>"

        ul.innerHTML += li;
    }
}

function loaderSlideshow(fuentes, containerUl) {

}