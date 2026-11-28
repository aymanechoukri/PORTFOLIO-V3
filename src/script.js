import { closeMenu, opneMenu } from "./burgerMenu.js";
import { renderProjects, searchAndFliter } from "./prijects.js";
import { validationForm } from "./validation.js";

AOS.init({
    once: true,
    duration: 900
});

const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 0.8,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


const menu = document.querySelector("#menu")
const close = document.querySelector("#close")
const opne = document.querySelector("#opne");
const introBackground = document.querySelector(".intro-background");
const group = document.querySelector("#group");

const search = document.querySelector("#search");
const category = document.querySelector("#category");

const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const submit = document.querySelector("#submit");


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


let valueName = "";
let valueEmail = "";
let valueMessage = "";

fullName.addEventListener("input", (e) => {
    valueName = e.target.value;
})

email.addEventListener("input", (e) => {
    valueEmail = e.target.value;
})

message.addEventListener("input", (e) => {
    valueMessage = e.target.value;
})

submit.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isValid = validationForm(valueName, valueEmail, valueMessage);
    console.log(isValid)
    if (!isValid) {
        Toastify({
            text: "Please check your inputs!",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "#E5092A",
                borderRadius: "12px"
            }
        }).showToast();
        return;
    }


    const res = await fetch(submit.action, {
       method: "POST",
       headers: {Accept: "application/json"},
       body: new FormData(submit),
    });

    if (!res.ok) {
         Toastify({
            text: "Something went wrong. Try again!",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "#E5092A",
                borderRadius: "12px"
            }
        }).showToast();
        throw new Error("In Valid: ", res.status);
    }
     Toastify({
                text: "Message sent successfully!",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#16A34A",
                    borderRadius: "12px"
                }
            }).showToast();
    submit.reset();
})


const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
    });
});