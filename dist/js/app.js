console.log("le js charge"),document.onreadystatechange=function(){console.log("onreadystatechange marche"),"complete"===document.readyState&&(console.log("if complete marche"),navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){let o=e.coords.latitude,t=e.coords.longitude,r=new FormData;r.append("latitude",o),r.append("longitude",t),console.log("if geolocalisation marche"),fetch("/weather/get",{method:"POST",body:r}).then(e=>e.json()).then(e=>{console.log(e)}).catch(e=>{console.log(e)})}))};const connexion=document.querySelector("#connexion"),login=document.querySelector("#login"),pass=document.querySelector("#pass");function verify(e,o){e.addEventListener(o,e=>{if("Enter"===e.key||"click"===o){let e=new FormData;e.append("login",login.value),e.append("pass",pass.value),fetch("/wetransfer_like/admin/verifForm",{method:"POST",body:e}).then(e=>e.json()).then(e=>{e.error?document.querySelector("#error").innerHTML=e.error:window.location.replace("/wetransfer_like/dashboard")})}})}verify(connexion,"click"),verify(login,"keydown"),verify(pass,"keydown"),$(".message a").click(function(){$("form").animate({height:"toggle",opacity:"toggle"},"slow")});const validerRegister=document.querySelector("#valider-register"),mailRegister=document.querySelector("#mail-register"),passRegister=document.querySelector("#pass-register"),prenomRegister=document.querySelector("#prenom-register"),sexeRegister=document.querySelector("#sexe-register"),localisationRegister=document.querySelector("#localisation-register");function verify(e,o){e.addEventListener(o,e=>{if("Enter"===e.key||"click"===o){let e=new FormData;e.append("mail",mailRegister.value),e.append("pass",passRegister.value),e.append("prenom",prenomRegister.value),e.append("sexe",sexeRegister.value),e.append("localisation",localisationRegister.value),fetch("/register/verif",{method:"POST",body:e}).then(e=>e.text()).then(e=>{console.log(e)})}})}verify(validerRegister,"click"),verify(mailRegister,"keydown"),verify(passRegister,"keydown"),verify(prenomRegister,"keydown"),verify(localisationRegister,"keydown");
//# sourceMappingURL=app.js.map