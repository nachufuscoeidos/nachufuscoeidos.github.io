window.addEventListener("load", paginaRecursero);

function paginaRecursero() {
    let recursos = [];

    fetch("assets/recursero.csv")
    .then(function(response) {
        return response.text();
    })
    .then(function(rawCSV) {
        let preRecursos = CSVToArray(rawCSV, ",")
        preRecursos.shift();

        for (let i = 0; i < preRecursos.length; i++) {
            recursos = agregarRecurso(recursos, preRecursos[i])
        }

        mostrarRecursos(recursos);
        
    })
    .catch(function(e) {
        console.log("Error loading online CSV: " + e);
    })
}

function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }


        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            var strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

function agregarRecurso(lista, elemento) {
    if (elemento.length != 7) {
        console.log("Error with resource");
        console.log(elemento);
        return lista;
    }
    
    let archivo = {
        nombre: elemento[0],
        archivo: elemento[1],
        categoria: elemento[2],
        proveedor: elemento[3],
        descripcion: elemento[4],
        tipo: elemento[5],
        url: elemento[6]
        
    }

    lista.push(archivo)

    return lista;
}

function mostrarRecursos(recursos) {
    for (let i = 0; i < recursos.length; i++) {
        let seccionCategoria = document.querySelector(".cat-" + recursos[i].categoria)
        seccionCategoria.innerHTML += '<button class="uk-button uk-button-default uk-margin-small-right boton-modal" type="button" uk-toggle="target: #modal-recurso">' + recursos[i].nombre + '</button>'
    }

    let botones = document.querySelectorAll(".boton-modal")
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", function() {
            crearModal(recursos[i], i)            
        })
    }
    
    
    document.querySelector(".loader-recursos").style.display = "none"
    document.querySelector(".section-recursos").style.display = "block";
}

function crearModal(recurso, idModal) {
    if (recurso.tipo.toLowerCase() == "pdf") {
        crearModalPDF(recurso, idModal)
    }

    if (recurso.tipo.toLowerCase() == "youtube") {
        crearModalYoutube(recurso, idModal)
    }

    if (recurso.tipo.toLowerCase() == "link") {
        crearModalLink(recurso, idModal)
    }
}

function crearModalPDF(recurso, idModal) {
    let modal = "";

    modal += '<div class="uk-modal-dialog uk-modal-body">'
    modal += '<h2 class="uk-modal-title">' + recurso.nombre + '</h2>'
    modal += '<h4 class="modal-subtitle">Aportado por ' + recurso.proveedor + '</h4>'

    if (recurso.descripcion.trim() != "") {
        modal += "<p>" +  recurso.descripcion + "</p>"
    }

    modal += '<div>'
    modal += "<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='" + recurso.url + "' width='640' height='480'></iframe></div>"
    modal += '</div>'
    modal += '<p class="uk-text-right">'
    modal += '<button class="uk-button uk-button-default uk-modal-close" type="button">Cerrar</button>'
    if (recurso.archivo != "") {
        modal += '<a href="assets/' + recurso.archivo + '" download target="_blank">'
        modal += '<button class="uk-button uk-button-primary boton-descarga" type="button">Descargar</button>'
        modal += '</a>'
    }
    modal += '</p>'
    modal += '</div>'

    document.querySelector("#modal-recurso").innerHTML = modal;
}

function crearModalYoutube(recurso, idModal) {

    let codigoYoutube = recurso.url.split("=")[1]

    let modal = "";

    modal += '<div class="uk-modal-dialog uk-modal-body">'
    modal += '<h2 class="uk-modal-title">' + recurso.nombre + '</h2>'
    modal += '<h4 class="modal-subtitle">Aportado por ' + recurso.proveedor + '</h4>'

    if (recurso.descripcion.trim() != "") {
        modal += "<p>" +  recurso.descripcion + "</p>"
    }

    modal += '<div>'
    modal += "<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/" + codigoYoutube + "' frameborder='0' allowfullscreen></iframe></div>"
    modal += '</div>'
    modal += '<p class="uk-text-right">'
    modal += '<button class="uk-button uk-button-default uk-modal-close" type="button">Cerrar</button>'
    modal += '</p>'
    modal += '</div>'

    document.querySelector("#modal-recurso").innerHTML = modal;
} 

function crearModalLink(recurso, idModal) {
    let modal = "";

    modal += '<div class="uk-modal-dialog uk-modal-body">'
    modal += '<h2 class="uk-modal-title">' + recurso.nombre + '</h2>'
    modal += '<h4 class="modal-subtitle">Aportado por ' + recurso.proveedor + '</h4>'

    if (recurso.descripcion.trim() != "") {
        modal += "<p>" +  recurso.descripcion + "</p>"
    }

    modal += '<p class="uk-text-right">'
    modal += '<button class="uk-button uk-button-default uk-modal-close" type="button">Cerrar</button>'
    modal += '<a href="' + recurso.url + '" target="_blank">'
    modal += '<button class="uk-button uk-button-primary boton-descarga" type="button">Ver Nota</button>'
    modal += '</a>'
    modal += '</p>'
    modal += '</div>'

    document.querySelector("#modal-recurso").innerHTML = modal;
}