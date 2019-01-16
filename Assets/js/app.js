console.log("jpp");

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        if (navigator.geolocation) { /*demander l'autorisation d'obtenir la géolocalisation*/
        navigator.geolocation.getCurrentPosition(function (position) {

            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let data = new FormData();

            data.append("latitude", latitude);
            data.append("longitude", longitude);

            fetch("request.php", {method: "POST", body: data})
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
