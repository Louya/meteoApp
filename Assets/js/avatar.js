const genre_male = document.querySelector("#maleButton");
const genre_female = document.querySelector("#femaleButton");

const avatar_m1 = document.querySelector("#avatar_m1");
const avatar_m2 = document.querySelector("#avatar_m2");
const avatar_m3 = document.querySelector("#avatar_m3");
const avatar_m4 = document.querySelector("#avatar_m4");
const avatar_f1 = document.querySelector("#avatar_f1");
const avatar_f2 = document.querySelector("#avatar_f2");
const avatar_f3 = document.querySelector("#avatar_f3");
const avatar_f4 = document.querySelector("#avatar_f4");

const array_avatar = document.querySelectorAll(".img-avatar");
const array_skin = document.querySelectorAll(".skinButton");

const skin1 = document.querySelector("#skin1");
const skin2 = document.querySelector("#skin2");
const skin3 = document.querySelector("#skin3");
const skin4 = document.querySelector("#skin4");

avatar_m1.classList.remove("invisible");
genre_male.classList.add("genre");
genre_female.classList.remove("genre");
for (let i = 1; i < array_avatar.length; i++) {
    array_avatar[i].classList.add("invisible");
}

for (let j = 0; j < array_skin.length; j++) {
    array_skin[j].addEventListener("click", (e) => {
        for (let i = 0; i < array_avatar.length; i++) {
            array_avatar[i].classList.add("invisible");
        }
        array_avatar[j].classList.remove("invisible");
    })
}

genre_male.addEventListener("click", (e) => {
    avatar_m1.classList.remove("invisible");
    genre_male.classList.add("genre");
    genre_female.classList.remove("genre");
    for (let i = 1; i < array_avatar.length; i++) {
        array_avatar[i].classList.add("invisible");
    }

    for (let j = 0; j < array_skin.length; j++) {
        array_skin[j].addEventListener("click", (e) => {
            for (let i = 0; i < array_avatar.length; i++) {
                array_avatar[i].classList.add("invisible");
            }
            array_avatar[j].classList.remove("invisible");
        })
    }
})

genre_female.addEventListener("click", (e) => {
    
    for (let i = 0; i < array_avatar.length; i++) {
        array_avatar[i].classList.add("invisible");
    }
    avatar_f1.classList.remove("invisible");

    genre_female.classList.add("genre");
    genre_male.classList.remove("genre");
    for (let j = 0; j < array_skin.length; j++) {
        array_skin[j].addEventListener("click", (e) => {
            for (let i = 0; i < array_avatar.length; i++) {
                array_avatar[i].classList.add("invisible");
            }
            array_avatar[j+4].classList.remove("invisible");
        })
    }
})