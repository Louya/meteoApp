const location_input = document.querySelector("#search");
const submit = document.querySelector("#adress");


function verify(element,event) {

    element.addEventListener(event, (e) => {

        if (e.key === "Enter" || event === "click") {
           
        
            let city = location_input.value;
            let url = `https://nominatim.openstreetmap.org/search?format=json&city=${city}`;

            fetch(url, {method: "POST"})
            .then( (result) => { return result.json() })
            .then( (result) => {
                if(!result.error){
    
                    let longitude = result[0].lon;
                    let latitude = result[0].lat;

                    let data = new FormData();
                    
                    data.append("latitude", latitude);
                    data.append("longitude", longitude);

                    fetch("/weather/get", {method: "POST", body: data})
                    .then( (results) => { return results.json() })
                    .then( (results) => {
                        if(!results.error){
                            console.log(results);
                            let chartTemp0 = Math.round(results.hourly.data[0].temperature);
                            let chartTemp6 = Math.round(results.hourly.data[6].temperature);
                            let chartTemp12 = Math.round(results.hourly.data[12].temperature);
                            let chartTemp18 = Math.round(results.hourly.data[18].temperature);
                            let chartTemp23 = Math.round(results.hourly.data[23].temperature);
        
                            let chartPrecip0 = Math.round(results.hourly.data[0].precipProbability);
                            let chartPrecip6 = Math.round(results.hourly.data[6].precipProbability);
                            let chartPrecip12 = Math.round(results.hourly.data[12].precipProbability);
                            let chartPrecip18 = Math.round(results.hourly.data[18].precipProbability);
                            let chartPrecip23 = Math.round(results.hourly.data[23].precipProbability);
        
                            console.log(chartTemp23);
        
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
        
                            let phase = (Math.round(results.daily.data[0].moonPhase * 8) / 8);
                            let moon = "";
        
                            switch (phase) {
                                case 0 || 1:
                                    moon = "Nouvelle lune";
                                    break;
                                case 0.125 || 0.775:
                                    moon = "Croissant de lune";                            
                                    break;
                                case 0.25 || 0.75:
                                    moon = "Demi lune";                                                        
                                    break;
                                case 0.5:
                                    moon = "Pleine lune";                                                        
                                    break;
                            }
        
        
                            let currentDate = new Date(results.currently.time * 1000);
        
                            let set = new Date(results.daily.data[0].sunsetTime * 1000);
                            let rise = new Date(results.daily.data[0].sunriseTime * 1000);
                            let riseHour, riseMinute, setHour, setMinute;
        
                            rise.getHours() < 10 ? riseHour = "0" + rise.getHours() : riseHour = rise.getHours();
                            rise.getMinutes() < 10 ? riseMinute = "0" + rise.getMinutes() : riseMinute = rise.getMinutes();
        
                            set.getHours() < 10 ? setHour = "0" + set.getHours() : setHour = set.getHours();
                            set.getMinutes() < 10 ? setMinute = "0" + set.getMinutes() : setMinute = set.getMinutes();
                            
                            weatherDay.innerHTML = day[currentDate.getDay()];
                            weatherDate.innerHTML = currentDate.getDate() + " " + month[currentDate.getMonth()] + " " + currentDate.getFullYear();
                            message.innerHTML = results.currently.summary;
                            temperature.innerHTML = Math.round(results.currently.temperature) + "°C";
                            pluie.innerHTML = Math.round(results.currently.precipProbability * 100) + "%";
                            weatherData[0].innerHTML = Math.round(results.currently.pressure) + " hpa";
                            weatherData[1].innerHTML = Math.round(results.currently.windSpeed) + " m/s";
                            weatherData[2].innerHTML = Math.round(results.currently.humidity) + "%";
                            weatherData[3].innerHTML = Math.round(results.currently.precipProbability * 100) + "%";
                            weatherData[4].innerHTML = Math.round(results.currently.temperature) + "°C";
                            weatherData[5].innerHTML = Math.round(results.currently.uvIndex);
                            weatherData[6].innerHTML = Math.round(results.currently.visibility) + " km";
                            weatherData[7].innerHTML = riseHour + ":" + riseMinute;
                            weatherData[8].innerHTML = setHour + ":" + setMinute;
                            weatherData[9].innerHTML = moon;
                            setTime.value = currentDate.getHours();
                            weatherHeure.innerHTML = currentDate.getHours() + ":00";
                            compass.style.transform = "rotate(" + results.currently.windBearing + "deg";
        
                            let temp = Math.round(results.hourly.data[setTime.value].temperature);
                            let rain = results.hourly.data[setTime.value].precipProbability;
                                                        
                            // Changement vêtements
                            function clothes(temp, rain){
                                                            
                                if(temp < 15 && rain < 0.2){
                                    for (let i = 0; i < array_clothes.length; i++) {
                                        array_clothes[i].classList.add("invisible");
                                    }
                                    set_clothes3.classList.remove("invisible");

                                }else if(temp < 15 && rain > 0.2){
                                    for (let i = 0; i < array_clothes.length; i++) {
                                        array_clothes[i].classList.add("invisible");
                                    }
                                    set_clothes4.classList.remove("invisible");

                                }else if(temp >= 15 && rain < 0.2){
                                    for (let i = 0; i < array_clothes.length; i++) {
                                        array_clothes[i].classList.add("invisible");
                                    }
                                    set_clothes1.classList.remove("invisible");

                                }else if(temp >= 15 && rain > 0.2){
                                    for (let i = 0; i < array_clothes.length; i++) {
                                        array_clothes[i].classList.add("invisible");
                                    }
                                    set_clothes2.classList.remove("invisible");
                                }
                            }
                            clothes(temp, rain);

                            setTime.addEventListener("change", () => {
                                
                                message.innerHTML = results.hourly.data[setTime.value].summary;
                                temperature.innerHTML = Math.round(results.hourly.data[setTime.value].temperature) + "°C";
                                pluie.innerHTML = Math.round(results.hourly.data[setTime.value].precipProbability * 100) + "%";
                                weatherData[0].innerHTML = Math.round(results.hourly.data[setTime.value].pressure) + " hpa";
                                weatherData[1].innerHTML = Math.round(results.hourly.data[setTime.value].windSpeed) + " m/s";
                                weatherData[2].innerHTML = Math.round(results.hourly.data[setTime.value].humidity) + "%";
                                weatherData[3].innerHTML = Math.round(results.hourly.data[setTime.value].precipProbability * 100) + "%";
                                weatherData[4].innerHTML = Math.round(results.hourly.data[setTime.value].temperature) + "°C";
                                weatherData[5].innerHTML = Math.round(results.hourly.data[setTime.value].uvIndex);
                                weatherData[6].innerHTML = Math.round(results.hourly.data[setTime.value].visibility) + " km";
                                weatherHeure.innerHTML = setTime.value + ":00";
                                compass.style.transform = "rotate(" + results.hourly.data[setTime.value].windBearing + "deg";
        
                                let temp = Math.round(results.hourly.data[setTime.value].temperature);
                                let rain = results.hourly.data[setTime.value].precipProbability;
                                clothes(temp, rain);
                                console.log(rain);
                            })

                        } else {
                            document.querySelector("#error").innerHTML = results.error;
                        }
                    });
                    
                } else {
                    document.querySelector("#error").innerHTML = result.error;
                }
            });
        }
    })
}

verify(submit, "click");
verify(location_input, "keydown");