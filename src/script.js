import { closeMenu, opneMenu } from "./burgerMenu.js";
import { renderProjects, searchAndFliter } from "./prijects.js";
import { validationForm } from "./validation.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.AOS) {
    AOS.init({ once: true, duration: prefersReducedMotion ? 0 : 900, offset: 80 });
}

if (window.Lenis && !prefersReducedMotion) {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, wheelMultiplier: 0.8 });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

const menu = document.querySelector("#menu");
const closeButton = document.querySelector("#close");
const openButton = document.querySelector("#opne");
const introBackground = document.querySelector(".intro-background");
const projectGroup = document.querySelector("#group");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const contactForm = document.querySelector("#submit");
const header = document.querySelector("header");

if (openButton && menu) openButton.addEventListener("click", () => opneMenu(menu));
if (closeButton && menu) closeButton.addEventListener("click", () => closeMenu(menu));

if (introBackground) {
    window.setTimeout(() => {
        introBackground.remove();
        document.body.style.overflow = "";
    }, 5000);
}

if (projectGroup) {
    projectGroup.append(renderProjects());
    window.AOS?.refreshHard();
}

let searchValue = "";
let categoryValue = "All";

function updateProjects() {
    if (!projectGroup) return;
    searchAndFliter(searchValue, categoryValue, projectGroup);
    window.AOS?.refreshHard();
}

searchInput?.addEventListener("input", (event) => {
    searchValue = event.target.value;
    updateProjects();
});

categorySelect?.addEventListener("change", (event) => {
    categoryValue = event.target.value;
    updateProjects();
});

function showToast(text, type = "error") {
    if (!window.Toastify) return;
    Toastify({
        text,
        duration: 3500,
        gravity: "top",
        position: "right",
        close: true,
        style: {
            background: type === "success" ? "#16A34A" : "#E5092A",
            borderRadius: "12px",
        },
    }).showToast();
}

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!contactForm.reportValidity()) return;

        const formData = new FormData(contactForm);
        const isValid = validationForm(
            String(formData.get("fullName") || ""),
            String(formData.get("email") || ""),
            String(formData.get("message") || "")
        );

        if (!isValid) {
            showToast("Please check your name, email, and message.");
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonContent = submitButton?.innerHTML;
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        }

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: formData,
            });
            if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

            contactForm.reset();
            showToast("Message sent successfully!", "success");
        } catch (error) {
            console.error("Contact form error:", error);
            showToast("Unable to send your message. Please try again.");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonContent;
            }
        }
    });
}

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (cursor && cursorDot && hasFinePointer) {
    document.body.classList.add("has-custom-cursor");
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener("pointerover", (event) => {
        if (event.target.closest("a, button, input, textarea, select")) cursor.classList.add("active");
    });
    document.addEventListener("pointerout", (event) => {
        if (event.target.closest("a, button, input, textarea, select")) cursor.classList.remove("active");
    });
}

function updateHeader() {
    if (!header) return;
    const isScrolled = window.scrollY > 50;
    header.classList.toggle("bg-black/30", isScrolled);
    header.classList.toggle("backdrop-blur-md", isScrolled);
    header.classList.toggle("border-b", isScrolled);
    header.classList.toggle("border-rose-900/30", isScrolled);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
