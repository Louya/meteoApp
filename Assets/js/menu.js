const sidebarButton = document.querySelector('#sidebarCollapse');
const dismiss = document.querySelector('#dismiss');
const sidebar = document.querySelector('#sidebar');
const overlay = document.querySelector('#overlay');

document.addEventListener("DOMContentLoaded",function(){

    sidebarButton.addEventListener('click', (e)=>{
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    })

    dismiss.addEventListener('click', (e)=>{
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    })
});