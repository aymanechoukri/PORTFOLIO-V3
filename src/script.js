import { closeMenu, opneMenu } from "./burgerMenu.js";
import { renderProjects, searchAndFliter } from "./prijects.js";

AOS.init({
    once: true,
    duration: 900
});

const menu = document.querySelector("#menu")
const close = document.querySelector("#close")
const opne = document.querySelector("#opne");
const introBackground = document.querySelector(".intro-background");
const group = document.querySelector("#group");

const search = document.querySelector("#search");
const category = document.querySelector("#category");


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

let searchValue = "";
let categoryValue = "All";

search.addEventListener("input", (e) => {
    searchValue = e.target.value;
    searchAndFliter(searchValue, categoryValue, group);
})

category.addEventListener("change", (e) => {
    categoryValue = e.target.value;
    searchAndFliter(searchValue, categoryValue, group);
})
