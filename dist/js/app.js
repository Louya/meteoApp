console.log("le js charge"),document.onreadystatechange=function(){console.log("onreadystatechange marche"),"complete"===document.readyState&&(console.log("if complete marche"),navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(o){let e=o.coords.latitude,t=o.coords.longitude,n=new FormData;n.append("latitude",e),n.append("longitude",t),console.log("if geolocalisation marche"),fetch("/weather/get",{method:"POST",body:n}).then(o=>o.text()).then(o=>{console.log(o)}).catch(o=>{console.log(o)})}))};
//# sourceMappingURL=app.js.map