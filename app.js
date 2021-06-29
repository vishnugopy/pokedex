let mainScreen = document.querySelector(".main-screen");
let pokeName = document.querySelector(".poke-name");
let pokeId = document.querySelector(".poke-id");
let pokeFrontImage = document.querySelector(".poke-front-image");
let pokeBackImage = document.querySelector(".poke-back-image");
let pokeWeight = document.querySelector(".poke-weight");
let pokeHeight = document.querySelector(".poke-height");
let listItem = document.querySelectorAll(".list-item")
let typeOne = document.querySelector(".poke-type-one")
let typeTwo = document.querySelector(".poke-type-two")

//buttons
let leftButton = document.querySelector(".left-button");
let rightButton = document.querySelector(".right-button");
let bbutton = document.querySelector(".buttons__button:nth-child(1)");
let abutton = document.querySelector(".buttons__button:nth-child(2)");

//extra
let next;
let previous;
let nameofpokie;

var apilink = "https://pokeapi.co/api/v2/pokemon";

function getpokies() {
    fetch(apilink)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    if (response.status == 400) {
                        console.log(data);
                        // gestion erreur données envoyer a la requette
                    } else if (response.status == 403) {
                        console.log(data);
                        // gestion erreur authentification
                    } else {
                        //console.log(data);
                        let arr = data["results"];
                        let str = "";
                        for (let i = 0; i < arr.length; i++) {
                            fetch(data["results"][i]["url"])
                                .then(function (response) {
                                    response.json()
                                        .then(function (data) {
                                            //console.log(data)
                                            str = data["id"] + "." + arr[i]["name"];
                                            listItem[i].innerHTML = str;
                                        })
                                })
                        }

                        listItem.forEach(element => {
                            element.style.textTransform = "capitalize";

                        });
                        next = data["next"];
                        previous = data["previous"];
                    }
                })
                .catch(function (data_parsing_error) {
                    console.log(data_parsing_error);
                })
        })
        .catch(function (server_errors) {
            // Cas erreur server (API)
            console.log(server_errors);
        })
}

rightButton.addEventListener("click", () => {
    function nextpage() {
        apilink = next;
    }
    nextpage();
    getpokies();
})


leftButton.addEventListener("click", () => {
    function previouspage() {
        apilink = previous;
    }
    previouspage();
    getpokies();
})

window.addEventListener("load", () => {
    getpokies();

})

bbutton.addEventListener("click", () => {
    document.body.style.backgroundImage = `url("https://i.pinimg.com/originals/39/d4/73/39d473c0f8b7b8c42e02ccc9253a7b50.gif")`;
    document.body.style.backgroundRepeat = "repeat";
})

abutton.addEventListener("click", () => {
    document.body.style.backgroundImage = `url("https://media0.giphy.com/media/KGeaDqHWzdJ2U723GG/source.gif")`;
    document.body.style.backgroundRepeat = "repeat";

})



listItem.forEach(element => {
    element.addEventListener("click", () => {
        fetch("https://pokeapi.co/api/v2/pokemon/" + element.textContent.match(/\d+/))
            .then(function (response) {

                // On appelle la method json a partir de l'objet response pour parser les données renvoyer par l'API
                response.json()
                    .then(function (data) {
                        if (response.status == 400) {
                            console.log(data);
                            // gestion erreur données envoyer a la requette
                        } else if (response.status == 403) {
                            console.log(data);
                            // gestion erreur authentification
                        } else {
                            //console.log(data);
                            // ici on peut exploiter nos donnée
                            mainScreen.classList.remove("hide");
                            pokeName.innerHTML = data["name"];
                            pokeName.style.textTransform = "capitalize";
                            let id = data["id"]
                            let shape = "#000";
                            let idStr = id.toString()
                            let finalID = shape.slice(0, 4 - idStr.length) + id;
                            pokeId.innerHTML = finalID;
                            pokeFrontImage.src = data["sprites"]["front_default"];
                            pokeBackImage.src = data["sprites"]["back_default"];
                            pokeWeight.innerHTML = data["weight"];
                            pokeHeight.innerHTML = data["height"];
                            typeOne.style.textTransform = "capitalize";
                            typeTwo.style.textTransform = "capitalize";
                            document.body.style.backgroundImage = `url(${pokeFrontImage.src})`;
                            document.body.style.backgroundRepeat = "space";

                            let code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
                            let arr = [];
                            window.addEventListener("keydown", (e) => {
                                arr.push(e.key);
                                console.log(arr);
                                arr.splice(code.length - 1, arr.length - code.length);
                                if (arr.join().includes(code)) {
                                    console.log("heelooo");
                                    document.body.style.backgroundImage = `url("https://i.pinimg.com/originals/b0/4d/3a/b04d3a0946bbe86a2722ce7fc2f4f472.gif")`;
                                
                                }
                            })


                            if (data["types"].length == 2) {
                                typeTwo.style.display = "block";
                                typeOne.innerHTML = data["types"][0]["type"]["name"]
                                typeTwo.innerHTML = data["types"][1]["type"]["name"]
                                mainScreen.className = '';
                                document.body.className = '';
                                mainScreen.classList.add("main-screen", typeOne.innerHTML);
                                document.body.classList.add("main-screen", typeOne.innerHTML);
                            } else {
                                typeOne.innerHTML = data["types"][0]["type"]["name"]
                                typeTwo.style.display = "none";
                                mainScreen.className = '';
                                document.body.className = '';
                                mainScreen.classList.add("main-screen", typeOne.innerHTML);
                                document.body.classList.add("main-screen", typeOne.innerHTML);


                            }
                        }
                    })
                    .catch(function (data_parsing_error) {
                        console.log(data_parsing_error);
                    })
            })
            .catch(function (server_errors) {
                // Cas erreur server (API)
                console.log(server_errors);
            })
    })
});
