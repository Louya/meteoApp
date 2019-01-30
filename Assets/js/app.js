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
const precedent = document.querySelector("#precedent");
const suivant = document.querySelector("#suivant");
const search = document.querySelector("#search");
const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const day = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const set_clothes = document.querySelectorAll("#clothes");
const array_clothes = document.querySelectorAll(".img-clothes");

let time = new Date();
time = time.getTime();
time = Math.round(time/1000);
let limit = time + (86400*6);
let base = time;
var latitude = 48.866667;
var longitude = 2.333333;
var result, temp, rain;

async function getSession() {
    const res = await fetch('/weather/session', {method: "POST"});
    const json = await res.json();
    
    if(json) {
        let adresse = json.adresse;
        let ville = json.ville;
        let link = "https://nominatim.openstreetmap.org/search?format=json&q=";
        async function getLocation() {
            const resultatFetch = await fetch(link + adresse + "," + ville, {method: "GET"});
            const reponse = await resultatFetch.json();
            latitude = reponse[0].lat;
            longitude = reponse[0].lon;
            result = reponse;

            getInitialData();
            // displayHourly();

        }
        getLocation();
    } else {

    
    // document.getElementById("sidebar").innerHTML = json.menu;





    getInitialData();

    document.onreadystatechange = function () {
        if (document.readyState === "complete") {

            if (navigator.geolocation) { /*demander l'autorisation d'obtenir la géolocalisation*/
                navigator.geolocation.getCurrentPosition(function (position) {

                    time = new Date();
                    time = time.getTime();
                    time = Math.round(time/1000);
                    limit = time + (86400*6);
                    base = time;

                    precedent.style.display = "none";

                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;

                    let data = new FormData();

                    data.append("latitude", latitude);
                    data.append("longitude", longitude);

                    fetch("/weather/get", {method: "POST", body: data})
                    .then((retourReponse) => {
                        return retourReponse.json();
                    })
                    .then((retourReponse) => {

                        result = retourReponse;

                        displayData(retourReponse);

                        temp = Math.round(retourReponse.hourly.data[setTime.value].temperature);
                        rain = retourReponse.hourly.data[setTime.value].precipProbability;
                        
                        j = 0 ;
                        clothes(temp, rain, j);

                        let lat = retourReponse.latitude;
                        let lon = retourReponse.longitude;
                        let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
                        
                        fetch(url, {method: "POST"})
                        .then( (result) => { return result.json() })
                        .then( (result) => {
                            if(!result.error){
                                let ville;

                                if(typeof result.address.city !== 'undefined'){
                                    ville = result.address.city;

                                } else if(typeof result.address.city === 'undefined' && typeof result.address.town !== 'undefined' ) {
                                    ville = result.address.town

                                } else {
                                    ville = result.address.village;
                                }  
                                document.querySelector("#search").value = ville;
                            }
                        }).catch((error) => {
                            console.log(error);
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                })
            }
        } else {
        }
    }

}
}

getSession();

function clothes(temp, rain, j){
                            
    if(temp >= 15 && rain < 0.30){
        for (let i = 0; i < array_clothes.length; i++) {
            array_clothes[i].classList.add("invisible");
        }
    set_clothes[j+0].classList.remove("invisible");
    
    }else if(temp >= 15 && rain > 0.30){
        for (let i = 0; i < array_clothes.length; i++) {
            array_clothes[i].classList.add("invisible");
        }
        set_clothes[j+1].classList.remove("invisible");

    }else if(temp < 15 && rain < 0.30){
        for (let i = 0; i < array_clothes.length; i++) {
            array_clothes[i].classList.add("invisible");
        }
        set_clothes[j+2].classList.remove("invisible");
        
    }else if(temp < 15 && rain > 0.30){
        for (let i = 0; i < array_clothes.length; i++) {
            array_clothes[i].classList.add("invisible");
        }
        set_clothes[j+3].classList.remove("invisible");
    }
}

function displayData(retourReponse) {
    let chartTemp0 = Math.round(retourReponse.hourly.data[0].temperature);
    let chartTemp3 = Math.round(retourReponse.hourly.data[3].temperature);
    let chartTemp6 = Math.round(retourReponse.hourly.data[6].temperature);
    let chartTemp9 = Math.round(retourReponse.hourly.data[9].temperature);
    let chartTemp12 = Math.round(retourReponse.hourly.data[12].temperature);
    let chartTemp15 = Math.round(retourReponse.hourly.data[15].temperature);
    let chartTemp18 = Math.round(retourReponse.hourly.data[18].temperature);
    let chartTemp21 = Math.round(retourReponse.hourly.data[21].temperature);
    let chartTemp23 = Math.round(retourReponse.hourly.data[23].temperature);

    let allChartTemp = [chartTemp0, chartTemp3, chartTemp6, chartTemp9, chartTemp12, chartTemp15, chartTemp18, chartTemp21, chartTemp23];

    let maxTemp = Math.max.apply(null, allChartTemp);
    let minTemp = Math.min.apply(null, allChartTemp);

    let maxAxisTemp = maxTemp > 20 ? maxTemp+2 : 20;
    let minAxisTemp = minTemp < 0 ? minTemp-2 : 0;
    
    let chartPrecip0 = Math.round(retourReponse.hourly.data[0].precipProbability * 100);
    let chartPrecip3 = Math.round(retourReponse.hourly.data[3].precipProbability * 100);
    let chartPrecip6 = Math.round(retourReponse.hourly.data[6].precipProbability * 100);
    let chartPrecip9 = Math.round(retourReponse.hourly.data[9].precipProbability * 100);
    let chartPrecip12 = Math.round(retourReponse.hourly.data[12].precipProbability * 100);
    let chartPrecip15 = Math.round(retourReponse.hourly.data[15].precipProbability * 100);
    let chartPrecip18 = Math.round(retourReponse.hourly.data[18].precipProbability * 100);
    let chartPrecip21 = Math.round(retourReponse.hourly.data[21].precipProbability * 100);
    let chartPrecip23 = Math.round(retourReponse.hourly.data[23].precipProbability * 100);



    new Chart(document.getElementById("summaryChart"), {
        type: 'line',
        data: {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
          datasets: [{ 
              radius: 0,
              data: [chartTemp0, chartTemp3, chartTemp6, chartTemp9, chartTemp12, chartTemp15, chartTemp18, chartTemp21, chartTemp23],
              yAxisID: 'temperature',
              label: "Température",
              borderColor: "#980000",
              backgroundColor: "rgba(152, 0, 0, 0.4)",
              fill: true
            }, { 
                radius: 0,
              data: [chartPrecip0, chartPrecip3, chartPrecip6, chartPrecip9, chartPrecip12, chartPrecip15, chartPrecip18, chartPrecip21, chartPrecip23],
              yAxisID: 'rain',
              label: "Précipitation",
              borderColor: "#030340",
              backgroundColor: "rgba(3, 3, 54, 0.4)",
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
                text: 'Températures et précipitations'
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    ticks: {
                        fontColor: "#980000",
                        min : minAxisTemp,
                        max: maxAxisTemp,
                        callback: function(value, index, values) {
                            return value + '°C';
                        }
                    },
                    position: 'left',
                    id: 'temperature',
                }, {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'right',
                    id: 'rain',
                    ticks: {
                        fontColor: "#030340",
                        min: 0,
                        max: 100,
                        callback: function(value, index, values) {
                            return value +'%';
                        }
                    },
    
                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }],
            }
        }
      });
      


    let phase = (Math.round(retourReponse.daily.data[0].moonPhase * 8) / 8);
    let moon = "";

    switch (phase) {
        case 0:
        case 1:
            moon = "Nouvelle lune";
            break;
        case 0.125: 
        case 0.875:
            moon = "Croissant";                            
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
    weatherImg.src = "../Assets/img/weather-icons/" + retourReponse.currently.icon + ".svg";
    pluie.innerHTML = Math.round(retourReponse.currently.precipProbability * 100) + "%";
    weatherData[0].innerHTML = riseHour + ":" + riseMinute;
    weatherData[1].innerHTML = setHour + ":" + setMinute;
    weatherData[2].innerHTML = moon;
    weatherData[3].innerHTML = Math.round(retourReponse.currently.pressure) + " hPa";
    weatherData[4].innerHTML = Math.round(retourReponse.currently.windSpeed) + " m/s";
    weatherData[5].innerHTML = Math.round(retourReponse.currently.humidity) + "%";
    weatherData[6].innerHTML = Math.round(retourReponse.currently.precipProbability * 100) + "%";
    weatherData[7].innerHTML = Math.round(retourReponse.currently.temperature) + "°C";
    weatherData[8].innerHTML = Math.round(retourReponse.currently.uvIndex);
    weatherData[9].innerHTML = Math.round(retourReponse.currently.visibility) + " km";
   
    setTime.value = currentDate.getHours();
    weatherHeure.innerHTML = currentDate.getHours() + ":00";
    compass.style.transform = "rotate(" + retourReponse.currently.windBearing + "deg";
}

function displayHourly() {
    message.innerHTML = result.hourly.data[setTime.value].summary;
    temperature.innerHTML = Math.round(result.hourly.data[setTime.value].temperature) + "°C";
    weatherImg.src = "../Assets/img/weather-icons/" + result.hourly.data[setTime.value].icon + ".svg";
    pluie.innerHTML = Math.round(result.hourly.data[setTime.value].precipProbability * 100) + "%";
    weatherData[3].innerHTML = Math.round(result.hourly.data[setTime.value].pressure) + " hPa";
    weatherData[4].innerHTML = Math.round(result.hourly.data[setTime.value].windSpeed) + " m/s";
    weatherData[5].innerHTML = Math.round(result.hourly.data[setTime.value].humidity) + "%";
    weatherData[6].innerHTML = Math.round(result.hourly.data[setTime.value].precipProbability * 100) + "%";
    weatherData[7].innerHTML = Math.round(result.hourly.data[setTime.value].temperature) + "°C";
    weatherData[8].innerHTML = Math.round(result.hourly.data[setTime.value].uvIndex);
    weatherData[9].innerHTML = Math.round(result.hourly.data[setTime.value].visibility) + " km";
    weatherHeure.innerHTML = setTime.value + ":00";
    compass.style.transform = "rotate(" + result.hourly.data[setTime.value].windBearing + "deg";

    // Changement vêtements
    let temp = Math.round(result.hourly.data[setTime.value].temperature);
    let rain = result.hourly.data[setTime.value].precipProbability;

    genre_male.addEventListener("click", (e) => {
        j = 0;
        clothes(temp, rain, j);
    })
    genre_female.addEventListener("click", (e) => {
        j = 4;
        clothes(temp, rain, j);
    })

    clothes(temp, rain, j);
}

function getPreviousDay() {

    let data = new FormData();
    time -= 86400;


    time === base ? precedent.style.display = "none" : precedent.style.display = "block";
    time === limit ? suivant.style.display = "none" : suivant.style.display = "block";

    if(time === base) {
        precedent.style.display = "none";
    } else {
        precedent.style.display = "block";
    }

    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("time", time);

    fetch("/weather/get", {method: "POST", body: data})
    .then((retourReponse) => {
        return retourReponse.json();
    })
    .then((retourReponse) => {

        result = retourReponse;

        displayData(retourReponse);
        displayHourly(retourReponse);

        // Changement vêtements
        let temp = Math.round(retourReponse.hourly.data[setTime.value].temperature);
        let rain = retourReponse.hourly.data[setTime.value].precipProbability;
        
        genre_male.addEventListener("click", (e) => {
            j = 0;
            clothes(temp, rain, j);
        })
        genre_female.addEventListener("click", (e) => {
            j = 4;
            clothes(temp, rain, j);
        })
        clothes(temp, rain, j);
            
    }).catch((error) => {
        console.log(error);
    });
}

function getNextDay() {

        let data = new FormData();
        time += 86400;


        if(time === limit) {
            suivant.style.display = "none";
        } else {
            suivant.style.display = "block";
        }

        time === base ? precedent.style.display = "none" : precedent.style.display = "block";
        time === limit ? suivant.style.display = "none" : suivant.style.display = "block";

        data.append("latitude", latitude);
        data.append("longitude", longitude);
        data.append("time", time);

        fetch("/weather/get", {method: "POST", body: data})
        .then((retourReponse) => {
            return retourReponse.json();
        })
        .then((retourReponse) => {

            result = retourReponse;

            displayData(retourReponse);
            displayHourly(retourReponse);

            // Changement vêtements
            let temp = Math.round(retourReponse.hourly.data[setTime.value].temperature);
            let rain = retourReponse.hourly.data[setTime.value].precipProbability;
        
            genre_male.addEventListener("click", (e) => {
                j = 0;
                clothes(temp, rain, j);
            })
            genre_female.addEventListener("click", (e) => {
                j = 4;
                clothes(temp, rain, j);
            })
            clothes(temp, rain, j);

        }).catch((error) => {
            console.log(error);
        });
}

function getInitialData() {

    let data = new FormData();

    data.append("latitude", latitude);
    data.append("longitude", longitude);

    fetch("/weather/get", {method: "POST", body: data})
    .then((retourReponse) => {
        return retourReponse.json();
    })
    .then((retourReponse) => {

        result = retourReponse;

        displayData(retourReponse);

        temp = Math.round(retourReponse.hourly.data[setTime.value].temperature);
        rain = retourReponse.hourly.data[setTime.value].precipProbability;
        
        genre_male.addEventListener("click", (e) => {
            j = 0;
            clothes(temp, rain, j);
        })
        genre_female.addEventListener("click", (e) => {
            j = 4;
            clothes(temp, rain, j);
        })
        j = 0 ;
        clothes(temp, rain, j);

        suivant.addEventListener('click', () => {
            getNextDay();
        });
    
        precedent.addEventListener('click', () => {
            getPreviousDay();
        });
    
        
        setTime.addEventListener("change", () => {                
            displayHourly();
        })

        let lat = retourReponse.latitude;
        let lon = retourReponse.longitude;
        let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
        
        fetch(url, {method: "POST"})
        .then( (result) => { return result.json() })
        .then( (result) => {
            if(!result.error){
                let ville;
                if(typeof result.address.city !== 'undefined'){
                    ville = result.address.city;
                } else if(typeof result.address.city === 'undefined' && typeof result.address.town !== 'undefined' ) {
                    ville = result.address.town
                } else {
                    ville = result.address.village;
                }  
                document.querySelector("#search").value = ville;
            }
        })
        

    }).catch((error) => {
        console.log(error);
    });
}

