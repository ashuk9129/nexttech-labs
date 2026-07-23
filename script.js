// =========================
// NEXTTECH LABS
// SCRIPT.JS
// =========================

// =========================
// Mobile Menu
// =========================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuBtn.innerHTML =
            navMenu.classList.contains("active")
                ? "✕"
                : "☰";

    });

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuBtn.innerHTML = "☰";

        });

    });

}

// =========================
// Sticky Header
// =========================

const header = document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.background = "rgba(11,17,32,0.95)";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

        } else {

            header.style.background = "rgba(11,17,32,.7)";
            header.style.boxShadow = "none";

        }

    });

}

// =========================
// Scroll Reveal
// =========================

const revealElements = document.querySelectorAll(
    ".service-card, .why-card, .project-card, .tech-stack span, .cta-box"
);

function revealOnScroll() {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if (top < trigger) {

            element.classList.add("show");

        }

    });

}

window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);

// =========================
// Floating Cards Animation
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
            duration: 3500 + (index * 500),
            iterations: Infinity
        }

    );

});

// =========================
// Smooth Scroll
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }

    });

});

// =========================
// Auto Copyright
// =========================

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
        `© ${new Date().getFullYear()} NextTech Labs. All Rights Reserved.`;

}

// =========================
// Console Branding
// =========================

console.log(`
🚀 NEXTTECH LABS

Engineering Smart Digital Solutions

✔ Web Development
✔ AI Solutions
✔ Data Analytics
✔ Workflow Automation

Website Loaded Successfully 🚀
`);
