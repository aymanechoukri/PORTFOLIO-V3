import { closeMenu, opneMenu } from "./burgerMenu.js";

const menu = document.querySelector("#menu")
const close = document.querySelector("#close")
const opne = document.querySelector("#opne");
const introBackground = document.querySelector(".intro-background");

opne.addEventListener("click", () => {
    opneMenu(menu)
});
close.addEventListener("click", () => {
    closeMenu(menu)
});

document.body.style.overflowX = "hidden";
setTimeout(() => {
    document.body.style.overflow = "auto";
    introBackground.style.display = "none";
}, 5000);



