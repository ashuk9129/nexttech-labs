// =========================
// NEXTTECH LABS
// SCRIPT.JS
// =========================

// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// Close menu on link click

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});


// =========================
// Sticky Header Effect
// =========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.style.background = "rgba(11,17,32,0.95)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    } else {
        header.style.background = "rgba(11,17,32,0.7)";
        header.style.boxShadow = "none";
    }

});


// =========================
// Scroll Reveal Animation
// =========================

const revealElements = document.querySelectorAll(
    ".service-card, .why-card, .project-card, .tech-stack span, .cta-box"
);

const revealOnScroll = () => {

    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add("show");
        }

    });

};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// =========================
// Hero Cards Floating Effect
// =========================

const cards = document.querySelectorAll(
    ".dashboard-card, .ai-card, .analytics-card"
);

cards.forEach((card, index) => {

    card.animate(
        [
            {
                transform: "translateY(0px)"
            },
            {
                transform: "translateY(-12px)"
            },
            {
                transform: "translateY(0px)"
            }
        ],
        {
            duration: 3500 + (index * 600),
            iterations: Infinity
        }
    );

});


// =========================
// Smooth Scroll
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// =========================
// Current Year Auto Update
// =========================

const copyright =
document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
    `© ${new Date().getFullYear()} NextTech Labs. All Rights Reserved.`;

}


// =========================
// Console Branding
// =========================

console.log(`
🚀 NextTech Labs

Engineering Smart Digital Solutions

Web Development
AI Solutions
Data Analytics
Workflow Automation

Website Loaded Successfully
`);