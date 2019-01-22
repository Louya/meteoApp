const message = document.querySelector("#message");
const temperature = document.querySelector("#tempData");
const pluie = document.querySelector("#tempRain");
const weatherData = document.querySelectorAll(".data");
const weatherDate = document.querySelector("#weather-date");
const setTime = document.querySelector("#setTime");
const weatherHeure = document.querySelector("#weather-heure");
const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];


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

                    // let phase = Math.round((retourReponse.daily.data[0].moonPhase-0)*0.25/(1-0))/0.25; // bring to 0-1 range
                    // phase = phase*(1-0) + 0;

                    let phase = (Math.round(retourReponse.daily.data[0].moonPhase * 4) / 4);
                    let moon = "";

                    switch (phase) {
                        case 0:
                            moon = "Nouvelle lune";
                            break;
                        case 0.25:
                            moon = "1er Croissant";                            
                            break;
                        case 0.5:
                            moon = "Demi lune";                                                        
                            break;
                        case 0.75:
                            moon = "3ème Croissant";                                                                                    
                            break;
                        case 1:
                            moon = "Pleine lune"
                            break;
                    }

                    // .toFixed(2)

                    let currentDate = new Date(retourReponse.currently.time * 1000);
                    
                    let set = new Date(retourReponse.daily.data[0].sunsetTime * 1000);
                    let rise = new Date(retourReponse.daily.data[0].sunriseTime * 1000);
                    let riseHour, riseMinute, setHour, setMinute;

                    rise.getHours() < 10 ? riseHour = "0" + rise.getHours() : riseHour = rise.getHours();
                    rise.getMinutes() < 10 ? riseMinute = "0" + rise.getMinutes() : riseMinute = rise.getMinutes();

                    set.getHours() < 10 ? setHour = "0" + set.getHours() : setHour = set.getHours();
                    set.getMinutes() < 10 ? setMinute = "0" + set.getMinutes() : setMinute = set.getMinutes();

                    weatherDate.innerHTML = currentDate.getDate() + " " + month[currentDate.getMonth()] + " " + currentDate.getFullYear();
                    message.innerHTML = retourReponse.currently.summary;
                    temperature.innerHTML = Math.round(retourReponse.currently.temperature) + "°C";
                    pluie.innerHTML = retourReponse.currently.precipProbability * 100 + "%";
                    weatherData[0].innerHTML = Math.round(retourReponse.currently.pressure) + " hpa";
                    weatherData[1].innerHTML = Math.round(retourReponse.currently.windSpeed) + " m/s";
                    weatherData[2].innerHTML = Math.round(retourReponse.currently.humidity) + "%";
                    weatherData[3].innerHTML = retourReponse.currently.precipProbability * 100 + "%";
                    weatherData[4].innerHTML = Math.round(retourReponse.currently.temperature) + "°C";
                    weatherData[5].innerHTML = Math.round(retourReponse.currently.uvIndex);
                    weatherData[6].innerHTML = Math.round(retourReponse.currently.visibility) + " km";
                    weatherData[7].innerHTML = riseHour + ":" + riseMinute;
                    weatherData[8].innerHTML = setHour + ":" + setMinute;
                    weatherData[9].innerHTML = moon;
                    setTime.value = currentDate.getHours();
                    weatherHeure.innerHTML = currentDate.getHours() + ":00";

                    setTime.addEventListener("change", () => {

                        message.innerHTML = retourReponse.hourly.data[setTime.value].summary;
                        temperature.innerHTML = Math.round(retourReponse.hourly.data[setTime.value].temperature) + "°C";
                        pluie.innerHTML = retourReponse.hourly.data[setTime.value].precipProbability * 100 + "%";
                        weatherData[0].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].pressure) + " hpa";
                        weatherData[1].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].windSpeed) + " m/s";
                        weatherData[2].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].humidity) + "%";
                        weatherData[3].innerHTML = retourReponse.hourly.data[setTime.value].precipProbability * 100 + "%";
                        weatherData[4].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].temperature) + "°C";
                        weatherData[5].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].uvIndex);
                        weatherData[6].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].visibility) + " km";
                        weatherHeure.innerHTML = setTime.value + ":00";

                        console.log(setTime.value);

                    })

                }).catch((error) => {
                    console.log(error);
                });
            })
        }
    }
}