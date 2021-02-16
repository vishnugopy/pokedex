let mainScreen = document.querySelector(".main-screen");
let pokeName = document.querySelector(".poke-name");
let pokeId = document.querySelector(".poke-id");
let pokeFrontImage = document.querySelector(".poke-front-image");
let pokeBackImage = document.querySelector(".poke-back-image");
let pokeWeight = document.querySelector(".poke-weight");
let pokeHeight = document.querySelector(".poke-height");
let listItem = document.querySelectorAll(".list-item")
//buttons
let leftButton = document.querySelector(".left-button");
let rightButton = document.querySelector(".right-button");


mainScreen.classList.remove("hide");

let fetch_config = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}

// Initialise la requete http avec l'url de la ressource et les configurations définis ci-dessus
fetch("https://pokeapi.co/api/v2/pokemon", fetch_config)
.then(function (response) {

    // On appelle la method json a partir de l'objet response pour parser les données renvoyer par l'API
    response.json()
        .then(function (data) {
            if (response.status == 400) {
                console.log(data);
                // gestion erreur données envoyer a la requette
            }
            else if (response.status == 403) {
                console.log(data);
                // gestion erreur authentification
            }
            else {
                console.log(data["results"]);
                // ici on peut exploiter nos donnée
                let arr = data["results"];
    


                for (let j = 0; j < listItem.length; j++) {
                    for (let i = 0; i < arr.length; i++) {
                        listItem.forEach(element => {
                            element.innerHTML = j + ". HELLO" ;
                        });
                       
                    }

                }

                       
               


               
            }
        })
        .catch(function (data_parsing_error) {
            console.log(data_parsing_error);
        })
})
.catch(function(server_errors) {
    // Cas erreur server (API)
    console.log(server_errors);
})