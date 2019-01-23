const message = document.querySelector("#message");
const temperature = document.querySelector("#tempData");
const pluie = document.querySelector("#tempRain");
const weatherData = document.querySelectorAll(".data");
const weatherDate = document.querySelector("#weather-date");
const setTime = document.querySelector("#setTime");
const weatherHeure = document.querySelector("#weather-heure");
const weatherDay = document.querySelector("#weather-day");
const compass = document.querySelector("#compass");
const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const day = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];


document.onreadystatechange = function () {
    console.log("onreadystatechange marche");
    if (document.readyState === "complete") {
        console.log("if complete marche");
        if (navigator.geolocation) { /*demander l'autorisation d'obtenir la géolocalisation*/
            navigator.geolocation.getCurrentPosition(function (position) {

                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;

                let data = new FormData();

                data.append("latitude", latitude);
                data.append("longitude", longitude);

                console.log("if geolocalisation marche");
                fetch("/weather/get", {method: "POST", body: data})
                    .then((retourReponse) => {
                        return retourReponse.json();
                    })
                    .then((retourReponse) => {
                        console.log(retourReponse);

                    }).catch((error) => {
                        console.log(error);
                    });
            })
        }
    }
}