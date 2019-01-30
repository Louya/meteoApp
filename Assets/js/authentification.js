const connexionLogin = document.querySelector("#connexion_login");
const loginLogin = document.querySelector("#login_login");
const passLogin = document.querySelector("#pass_login");
const messageLogin = document.querySelector("#error");
// const search = document.querySelector("#search");


function verify(element, event) {

    if ((element) != null) {

    element.addEventListener(event, (e) => {

        console.log("listener");
        if (e.key === "Enter" || event === "click") {

            console.log("un evenement");

           
            let data = new FormData();
            data.append("login", loginLogin.value);
            data.append("pass", passLogin.value);
        
            fetch("/login/verif", {method: "POST", body: data})
            .then( (result) => { return result.json() } )
            .then( (result) => {
                // console.log(result.error);
                if(!result.error){
                    // console.log(result);
                    // messageLogin.innerHTML = 'Bonjour ' + result.infos.prenom;
                    // search.value = result.infos.adresse + ' ' + result.infos.ville;
                    // console.log(result.infos.sexe);
                    // window.location.replace("/weather");
                    console.log(result);
                    console.log(result.adresse)
                    console.log(result.ville)
                    document.querySelector("#error").innerHTML = 'Connexion réussie';
                    // location.reload();

                } else {
                    document.querySelector("#error").innerHTML = result.error;
                }
            });
        }
    })
}
}


verify(connexionLogin, "click");
verify(loginLogin, "keydown");
verify(passLogin, "keydown");