const validerRegister = document.querySelector("#valider-register");
const mailRegister = document.querySelector("#mail-register");
const passRegister = document.querySelector("#pass-register");
const prenomRegister = document.querySelector("#prenom-register");
const adresseRegister = document.querySelector("#adresse-register");
const villeRegister = document.querySelector("#ville-register");



document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        if (navigator.geolocation) { /*demander l'autorisation d'obtenir la géolocalisation*/
            navigator.geolocation.getCurrentPosition(function (position) {

                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let link = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude + "&lon=" + longitude;

                fetch(link, {
                        method: "POST"
                    })
                    .then((result) => {
                        return result.json()
                    })
                    .then((result) => {


                        let ville;

                        if (typeof result.address.city !== 'undefined') {
                            ville = result.address.city;
                        } else if (typeof result.address.city === 'undefined' && typeof result.address.town !== 'undefined') {
                            ville = result.address.town
                        } else {
                            ville = result.address.village;
                        }

                        let route = result.address.road;

                        adresseRegister.value = route;
                        villeRegister.value = ville;

                    });

            })
        }
    }
}


function verifyRegister(element, event) {

    element.addEventListener(event, (e) => {

        if (e.key === "Enter" || event === "click") {
            let data = new FormData();
            data.append("mail", mailRegister.value);
            data.append("pass", passRegister.value);
            data.append("prenom", prenomRegister.value);
            data.append("adresse", adresseRegister.value);
            data.append("ville", villeRegister.value);

            fetch("/register/verif", {
                    method: "POST",
                    body: data
                })
                .then((result) => {
                    return result.json()
                })
                .then((result) => {
                    console.log(result);
                    if (!result.message) {
                        document.querySelector(".message").innerHTML = "Inscription réussie, vous allez être redirigé.";
                        setTimeout(function () {
                            window.location.replace("/weather");
                        }, 3000);
                    } else {
                        document.querySelector(".message").innerHTML = "";
                        for (let i = 0; i < result.message.length; i++) {
                            document.querySelector(".message").innerHTML += result.message[i] + '</br>';
                        }
                    }
                });
        }
    })
}

verifyRegister(validerRegister, "click");
verifyRegister(mailRegister, "keydown");
verifyRegister(passRegister, "keydown");
verifyRegister(prenomRegister, "keydown");
verifyRegister(adresseRegister, "keydown");
verifyRegister(villeRegister, "keydown");