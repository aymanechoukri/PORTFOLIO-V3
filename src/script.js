import { closeMenu, opneMenu } from "./burgerMenu.js";
import { renderProjects } from "./prijects.js";

const menu = document.querySelector("#menu")
const close = document.querySelector("#close")
const opne = document.querySelector("#opne");
const introBackground = document.querySelector(".intro-background");
const group = document.querySelector("#group");

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

group.append(renderProjects());
console.log(group)
console.log(renderProjects())