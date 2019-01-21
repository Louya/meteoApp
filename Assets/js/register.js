// $('.message a').click(function(){
//     $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
//  });

const validerRegister = document.querySelector("#valider-register");
const mailRegister = document.querySelector("#mail-register");
const passRegister = document.querySelector("#pass-register");
const prenomRegister = document.querySelector("#prenom-register");
const sexeRegister = document.querySelector("#sexe-register");
const adresseRegister = document.querySelector("#adresse-register");
const villeRegister = document.querySelector("#ville-register");
const colorRegister = document.querySelector("#color-register");



document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        if (navigator.geolocation) { /*demander l'autorisation d'obtenir la géolocalisation*/
            navigator.geolocation.getCurrentPosition(function (position) {

                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let link = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude + "&lon=" + longitude;

                fetch(link, {method: "POST"})
                .then( (result) => { return result.json() } )
                .then( (result) => {
                // console.log(result);

                let ville = typeof result.address.city !== 'undefined' ? result.address.city:result.address.town; 
                let route = result.address.road;
                
                adresseRegister.value = route;
                villeRegister.value = ville;

                });

            })
        }
    }
}





colorRegister.addEventListener('click', () => {
    colorRegister.style.backgroundColor = colorRegister.value; 
})

function verifyRegister(element, event) {

    element.addEventListener(event, (e) => {

        if (e.key === "Enter" || event === "click") {
            let data = new FormData();
            data.append("mail", mailRegister.value);
            data.append("pass", passRegister.value);
            data.append("prenom", prenomRegister.value);
            data.append("sexe", sexeRegister.value);
            data.append("color", colorRegister.value);
            data.append("adresse", adresseRegister.value);
            data.append("ville", villeRegister.value);
        
            fetch("/register/verif", {method: "POST", body: data})
            .then( (result) => { return result.json() } )
            .then( (result) => {
                console.log(result);
                if(!result.message){
                    document.querySelector(".message").innerHTML = "Inscription réussie, vous allez être redirigé.";
                    // setTimeout(function(){
                    //     window.location.replace("/weather");
                    // }, 3000);
                } else {
                    document.querySelector(".message").innerHTML = "";
                    for (let i = 0; i < result.message.length; i++) {
                        document.querySelector(".message").innerHTML += result.message[i] + '</br>';
                    }
                }
                }
            );
        }
    })
}

verifyRegister(validerRegister, "click");
verifyRegister(mailRegister, "keydown");
verifyRegister(passRegister, "keydown");
verifyRegister(prenomRegister, "keydown");
verifyRegister(adresseRegister, "keydown");
verifyRegister(villeRegister, "keydown");