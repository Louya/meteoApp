const location_input = document.querySelector("#location-input");
const submit = document.querySelector("#adress");

function verify(element, event) {

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