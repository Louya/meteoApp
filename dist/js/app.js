console.log("le js charge"), document.onreadystatechange = function () {
    console.log("onreadystatechange marche"), "complete" === document.readyState && (console.log("if complete marche"), navigator.geolocation && navigator.geolocation.getCurrentPosition(function (e) {
        let o = e.coords.latitude,
            r = e.coords.longitude,
            t = new FormData;
        t.append("latitude", o), t.append("longitude", r), console.log("if geolocalisation marche"), fetch("/weather/get", {
            method: "POST",
            body: t
        }).then(e => e.json()).then(e => {
            console.log(e)
        }).catch(e => {
            console.log(e)
        })
    }))
};
const connexionLogin = document.querySelector("#connexion_login"),
    loginLogin = document.querySelector("#login_login"),
    passLogin = document.querySelector("#pass_login");

// function verify(e, o) {
//     e.addEventListener(o, e => {
//         if ("Enter" === e.key || "click" === o) {
//             let e = new FormData;
//             e.append("login", login.value), e.append("pass", pass.value), fetch("/login/verif", {
//                 method: "POST",
//                 body: e
//             }).then(e => e.json()).then(e => {
//                 e.error ? document.querySelector("#error").innerHTML = e.error : (console.log(e), window.location.replace("/user"))
//             })
//         }
//     })
// }
// verify(connexion_login, "click"), 
// verify(login_login, "keydown"), 
// verify(pass_login, "keydown"), 

new Chart(document.getElementById("summaryChart"), {
    type: "line",
    data: {
        labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
        datasets: [{
            data: [1, 3, 8, 5, 2],
            yAxisID: "temperature",
            label: "Température",
            borderColor: "#980000",
            fill: !0
        }, {
            data: [0, 2, 5, 10, 3],
            yAxisID: "rain",
            label: "Précipitation",
            borderColor: "#030340",
            fill: !0
        }]
    },
    options: {
        legend: {
            display: !1
        },
        title: {
            display: !1,
            text: "World population per region (in millions)"
        },
        scales: {
            yAxes: [{
                type: "linear",
                display: !0,
                position: "left",
                id: "temperature"
            }, {
                type: "linear",
                display: !0,
                position: "right",
                id: "rain",
                ticks: {
                    min: 0,
                    max: 100
                },
                gridLines: {
                    drawOnChartArea: !1
                }
            }]
        }
    }
});
const validerRegister = document.querySelector("#valider-register"),
    mailRegister = document.querySelector("#mail-register"),
    passRegister = document.querySelector("#pass-register"),
    prenomRegister = document.querySelector("#prenom-register"),
    sexeRegister = document.querySelector("#sexe-register"),
    localisationRegister = document.querySelector("#localisation-register"),
    colorRegister = document.querySelector("#color-register");

function verify(e, o) {
    e.addEventListener(o, e => {
        if ("Enter" === e.key || "click" === o) {
            let e = new FormData;
            e.append("mail", mailRegister.value), e.append("pass", passRegister.value), e.append("prenom", prenomRegister.value), e.append("sexe", sexeRegister.value), e.append("color", colorRegister.value), e.append("localisation", localisationRegister.value), fetch("/register/verif", {
                method: "POST",
                body: e
            }).then(e => e.json()).then(e => {
                if (console.log(e), e.message) {
                    document.querySelector(".message").innerHTML = "";
                    for (let o = 0; o < e.message.length; o++) document.querySelector(".message").innerHTML += e.message[o] + "</br>"
                } else document.querySelector(".message").innerHTML = "Inscription réussie, vous allez être redirigé."
            })
        }
    })
}
colorRegister.addEventListener("click", () => {
    colorRegister.style.backgroundColor = colorRegister.value
}), verify(validerRegister, "click"), verify(mailRegister, "keydown"), verify(passRegister, "keydown"), verify(prenomRegister, "keydown"), verify(localisationRegister, "keydown");
//# sourceMappingURL=app.js.map