const message = document.querySelector("#message");
const temperature = document.querySelector("#tempData");
const pluie = document.querySelector("#tempRain");
const weatherData = document.querySelectorAll(".data");
const weatherDate = document.querySelector("#weather-date");
const setTime = document.querySelector("#setTime");
const weatherHeure = document.querySelector("#weather-heure");
const weatherDay = document.querySelector("#weather-day");
const weatherImg = document.querySelector("#weather-img");
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

                    let chartTemp0 = Math.round(retourReponse.hourly.data[0].temperature);
                    let chartTemp6 = Math.round(retourReponse.hourly.data[6].temperature);
                    let chartTemp12 = Math.round(retourReponse.hourly.data[12].temperature);
                    let chartTemp18 = Math.round(retourReponse.hourly.data[18].temperature);
                    let chartTemp23 = Math.round(retourReponse.hourly.data[23].temperature);

                    let chartPrecip0 = Math.round(retourReponse.hourly.data[0].precipProbability * 100);
                    let chartPrecip6 = Math.round(retourReponse.hourly.data[6].precipProbability * 100);
                    let chartPrecip12 = Math.round(retourReponse.hourly.data[12].precipProbability * 100);
                    let chartPrecip18 = Math.round(retourReponse.hourly.data[18].precipProbability * 100);
                    let chartPrecip23 = Math.round(retourReponse.hourly.data[23].precipProbability * 100);

                    new Chart(document.getElementById("summaryChart"), {
                        type: 'line',
                        data: {
                          labels: ['00:00', '06:00', '12:00', '18:00', '23:00'],
                          datasets: [{ 
                              data: [chartTemp0, chartTemp6, chartTemp12, chartTemp18, chartTemp23],
                              yAxisID: 'temperature',
                              label: "Température",
                              borderColor: "#980000",
                              fill: true
                            }, { 
                              data: [chartPrecip0, chartPrecip6, chartPrecip12, chartPrecip18, chartPrecip23],
                              yAxisID: 'rain',
                              label: "Précipitation",
                              borderColor: "#030340",
                              fill: true
                            }
                          ]
                        },
                        options: {
                            legend:{
                                display: false
                            },
                            title: {
                                display: false,
                                text: 'World population per region (in millions)'
                            },
                            scales: {
                                yAxes: [{
                                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                    display: true,
                                    position: 'left',
                                    id: 'temperature',
                                }, {
                                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                    display: true,
                                    position: 'right',
                                    id: 'rain',
                                    ticks: {
                                        min: 0,
                                        max: 100
                                    },
                    
                                    // grid line settings
                                    gridLines: {
                                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                                    },
                                }],
                            }
                        }
                      });
                      






                    // let phase = Math.round((retourReponse.daily.data[0].moonPhase-0)*0.25/(1-0))/0.25; // bring to 0-1 range
                    // phase = phase*(1-0) + 0;

                    let phase = (Math.round(retourReponse.daily.data[0].moonPhase * 8) / 8);
                    let moon = "";

                    switch (phase) {
                        case 0:
                        case 1:
                            moon = "Nouvelle lune";
                            break;
                        case 0.125: 
                        case 0.775:
                            moon = "Croissant de lune";                            
                            break;
                        case 0.25:
                        case 0.375:
                        case 0.625: 
                        case 0.75:
                            moon = "Demi lune";                                                        
                            break;
                        case 0.5:
                            moon = "Pleine lune";                                               
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
                    
                    weatherDay.innerHTML = day[currentDate.getDay()];
                    weatherDate.innerHTML = currentDate.getDate() + " " + month[currentDate.getMonth()] + " " + currentDate.getFullYear();
                    message.innerHTML = retourReponse.currently.summary;
                    temperature.innerHTML = Math.round(retourReponse.currently.temperature) + "°C";
                    weatherImg.src = "../Assets/img/weather-icons/" + retourReponse.currently.icon + ".png";
                    pluie.innerHTML = Math.round(retourReponse.currently.precipProbability * 100) + "%";
                    weatherData[0].innerHTML = Math.round(retourReponse.currently.pressure) + " hpa";
                    weatherData[1].innerHTML = Math.round(retourReponse.currently.windSpeed) + " m/s";
                    weatherData[2].innerHTML = Math.round(retourReponse.currently.humidity) + "%";
                    weatherData[3].innerHTML = Math.round(retourReponse.currently.precipProbability * 100) + "%";
                    weatherData[4].innerHTML = Math.round(retourReponse.currently.temperature) + "°C";
                    weatherData[5].innerHTML = Math.round(retourReponse.currently.uvIndex);
                    weatherData[6].innerHTML = Math.round(retourReponse.currently.visibility) + " km";
                    weatherData[7].innerHTML = riseHour + ":" + riseMinute;
                    weatherData[8].innerHTML = setHour + ":" + setMinute;
                    weatherData[9].innerHTML = moon;
                    setTime.value = currentDate.getHours();
                    weatherHeure.innerHTML = currentDate.getHours() + ":00";
                    compass.style.transform = "rotate(" + retourReponse.currently.windBearing + "deg";

                    
                    setTime.addEventListener("change", () => {
                        
                        message.innerHTML = retourReponse.hourly.data[setTime.value].summary;
                        temperature.innerHTML = Math.round(retourReponse.hourly.data[setTime.value].temperature) + "°C";
                        weatherImg.src = "../Assets/img/weather-icons/" + retourReponse.hourly.data[setTime.value].icon + ".png";
                        pluie.innerHTML = Math.round(retourReponse.hourly.data[setTime.value].precipProbability * 100) + "%";
                        weatherData[0].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].pressure) + " hpa";
                        weatherData[1].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].windSpeed) + " m/s";
                        weatherData[2].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].humidity) + "%";
                        weatherData[3].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].precipProbability * 100) + "%";
                        weatherData[4].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].temperature) + "°C";
                        weatherData[5].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].uvIndex);
                        weatherData[6].innerHTML = Math.round(retourReponse.hourly.data[setTime.value].visibility) + " km";
                        weatherHeure.innerHTML = setTime.value + ":00";
                        compass.style.transform = "rotate(" + retourReponse.hourly.data[setTime.value].windBearing + "deg";

                    })

                }).catch((error) => {
                    console.log(error);
                });
            })
        }
    }
}