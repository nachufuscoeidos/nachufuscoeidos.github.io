window.addEventListener("load", paginaCamp)

function paginaCamp() {
    let verMas = document.querySelector(".ver-mas");

    verMas.onclick = function(e) {
        e.preventDefault();

        let textoExtra = document.querySelector(".texto-oculto");

        if (textoExtra.style.display == "inline") {
            textoExtra.style.display = "none"
            this.innerHTML = "Ver más"
            this.style.paddingTop = "5px"
            this.style.paddingBottom = "8px"
        } else {
            textoExtra.style.display = "inline"
            this.innerHTML = "Ver menos"
            this.style.paddingTop = "10px"
            this.style.paddingBottom = "12px"
        }
        
    }

    loaderSlider("famosos.txt?" + Math.random(), "famosos");
}
