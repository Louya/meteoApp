const connexionLogin = document.querySelector("#connexion_login");
const loginLogin = document.querySelector("#login_login");
const passLogin = document.querySelector("#pass_login");


function verify(element, event) {

    element.addEventListener(event, (e) => {

        if (e.key === "Enter" || event === "click") {
           
            let data = new FormData();
            data.append("login", login_login.value);
            data.append("pass", pass_login.value);

            fetch("/login/verif", {method: "POST", body: data})
            .then( (result) => { return result.json() })
            .then( (result) => {
                // console.log(result.error);
                if(!result.error){
                    console.log(result.error);
                    window.location.replace("/user");
                } else {
                    document.querySelector("#error").innerHTML = result.error;
                }
            });
        }
    })
}

verify(connexion_login, "click");
verify(login_login, "keydown");
verify(pass_login, "keydown");