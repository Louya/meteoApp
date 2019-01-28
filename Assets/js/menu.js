// $(document).ready(function () {
            
//     $('#sidebarCollapse').on('click', function () {
//         $('#sidebar').toggleClass('active');
//         $('#overlay').toogleClass('active');
//     });
//     $('#dismiss').on('click', function () {
//         $('#sidebar').toggleClass('active');
//         $('#overlay').toogleClass('active');
//     });

// });

const sidebarButton = document.querySelector('#sidebarCollapse');
const dismiss = document.querySelector('#dismiss');
const sidebar = document.querySelector('#sidebar');
const overlay = document.querySelector('#overlay');

document.addEventListener("DOMContentLoaded",function(){

    sidebarButton.addEventListener('click', (e)=>{
        sidebar.toogleClass('active');
        overlay.toogleClass('active');
    })
});