const location_input = document.querySelector("#search");
const submit = document.querySelector("#adress");



getInitialData();

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
                            temp = Math.round(results.hourly.data[setTime.value].temperature);
                            rain = results.hourly.data[setTime.value].precipProbability;
                            
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

// Changement vêtements
function clothes(temp, rain, j){
                    
    if(temp >= 4 && rain < 0.15){
        for (let i = 0; i < array_clothes.length; i++) {
            array_clothes[i].classList.add("invisible");
        }
    set_clothes[j+0].classList.remove("invisible");
    
    }else if(temp >= 4 && rain > 0.15){
        for (let i = 0; i < array_clothes.length; i++) {
            array_clothes[i].classList.add("invisible");
        }
        set_clothes[j+1].classList.remove("invisible");

    }else if(temp < 4 && rain < 0.15){
        for (let i = 0; i < array_clothes.length; i++) {
            array_clothes[i].classList.add("invisible");
        }
        set_clothes[j+2].classList.remove("invisible");
        
    }else if(temp < 4 && rain > 0.15){
        for (let i = 0; i < array_clothes.length; i++) {
            array_clothes[i].classList.add("invisible");
        }
        set_clothes[j+3].classList.remove("invisible");
    }
}


function getInitialData() {
    let time = new Date();
time = time.getTime();
time = Math.round(time/1000);

var latitude = 48.866667;
var longitude = 2.333333;


    let data = new FormData();

    data.append("latitude", latitude);
    data.append("longitude", longitude);

    fetch("/weather/get", {method: "POST", body: data})
    .then((retourReponse) => {
        return retourReponse.json();
    })
    .then((retourReponse) => {
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

    }).catch((error) => {
        console.log(error);
    });
}