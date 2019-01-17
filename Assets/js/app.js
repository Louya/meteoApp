console.log("le js charge");

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
                    return retourReponse.text();
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
