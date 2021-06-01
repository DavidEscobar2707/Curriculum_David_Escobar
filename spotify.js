
//Rutina para hacer una petición de tipo POST
const URLPOST="https://accounts.spotify.com/api/token"

let llave1="grant_type=client_credentials"
let llave2="client_id=a0b90ced230943cdbdb1ef23e95f3d02"
let llave3="client_secret=daa636c78665409ba3ba599638c848b0"

let peticionPOST={
    method:"POST",
    headers:{"Content-Type": 'application/x-www-form-urlencoded'},
    body:llave1+'&'+llave2+'&'+llave3
}

fetch(URLPOST,peticionPOST)
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(datos){
        let token= `${datos.token_type} ${datos.access_token}`;
        solicitarCanciones(token)
    })    

    function solicitarCanciones(token){
        let URL="https://api.spotify.com/v1/artists/1ZwdS5xdxEREPySFridCfh/top-tracks?market=US"

        let peticionGET={
            method:"GET",
            headers:{Authorization:token}
        }
        fetch(URL,peticionGET)
        .then(function(respuesta){
            return(respuesta.json())
        })
        .then(function(datos){
            console.log(datos)
            depurarDatos(datos)
        })
    }
    function depurarDatos(datos){
        let pistas=datos.tracks;
        let datosFiltrados=pistas.map(function(pista){
            return{
                nombre:pista.name,
                audio: pista.preview_url,
                imagen:pista.album.images[0].url,
                popularidad: pista.popularity
            }
        })
        pintarDatos(datosFiltrados);
        
    }
    function pintarDatos(datosFiltrados){
        let contenedorPadre=document.getElementById("contenedorPadre");
        
        datosFiltrados.map(function(pista){
            //pintar un div con la clase col
            let contenedorColumna=document.createElement("div");
            contenedorColumna.classList.add("col")
            //pintar un div con la clase card
            let tarjeta=document.createElement("div");
            tarjeta.classList.add("card");
            tarjeta.classList.add("h-100");
            //pintar una img con clase card-img-top
            let foto=document.createElement("img")
            tarjeta.classList.add("card-img-top");
            foto.src=pista.imagen;
            //pintar un audio
            
            //-------------------------------------//
            //INDICAR QUE LA FOTO VA DENTRO DE LA TARJETA
            tarjeta.appendChild(foto);
            
            //INDICAR QUE LA TARJETA VA DENTRO DEL CONTENEDOR COLUMNA
            contenedorColumna.appendChild(tarjeta);

            //INDICAR QUE EL CONTENEDOR COLUMNA VA DENTRO DEL CONTENEDOR PADRE
            contenedorPadre.appendChild(contenedorColumna);
        })

    }


  


//https://developer.mozilla.org/es/docs/Web/API/Document/createElement












/* const URL="https://api.spotify.com/v1/artists/1ZwdS5xdxEREPySFridCfh/top-tracks?market=US";

const TOKEN="Bearer BQCFmiZl407aWtuFJ_qGouRQA68i4eiLrjUUg1WW3mYqUErrstqKCNecHhJxP1ymHNMaiwsW--_DISCnfMSafD6ltVUMKKlxBgQp-sjDeH4WLrUu2oCY9dfKSzujDRNiKAjgJIlwpUcopcFaCgObaQ68DWEQXr5_ROk";


let peticion={
    method: "GET",
    headers: {
        Authorization:TOKEN
    }
}

fetch(URL,peticion)
.then(function(respuesta){
    return(respuesta.json())
})
.then(function(datos){
    //un arreglo de 10 elementos con la información de 10 canciones del artista
    let pistas=datos.tracks

    let datosFiltrados=pistas.map(function(pista){

        return({
            nombre:pista.name,
            nombreAlbum:pista.album.name,
            audio: pista.preview_url,
            imagen:pista.album.images[0].url,
            popularidad: pista.popularity
        });

    })
    console.log(pistas);
    console.log(datosFiltrados); 

    let cancion=document.getElementById("cancion1");
    cancion.src=datosFiltrados[0].audio;
});  */
