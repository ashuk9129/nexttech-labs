// =========================
// NEXTTECH LABS
// SCRIPT.JS
// =========================

// =========================
// Mobile Menu
// =========================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

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
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
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
// =========================
// Contact Form - Backend API
// =========================


// =========================
// Contact Form - Cloudflare Worker + D1
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const btn = document.getElementById("sendBtn");

        const leadData = {
            name: document.getElementById("name")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",
            phone: document.getElementById("phone")?.value.trim() || "",
            subject: document.getElementById("subject")?.value.trim() || "",
            message: document.getElementById("message")?.value.trim() || ""
        };

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = "Sending...";
        }

        try {
            const response = await fetch(
                "https://nexttech-contact-api.ashutoshbro25.workers.dev/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(leadData)
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to send message.");
            }

            if (typeof Swal !== "undefined") {
                Swal.fire({
                    icon: "success",
                    title: "Message Received!",
                    text: data.emailSent
                        ? "Thank you! Your message has been sent successfully."
                        : "Your message has been saved. Email notification is still being checked.",
                    confirmButtonColor: "#2563eb"
                });
            } else {
                alert(data.emailSent
                    ? "Message sent successfully!"
                    : "Message saved. Email notification is still being checked.");
            }

            contactForm.reset();

        } catch (error) {
            console.error("Contact Form Error:", error);

            if (typeof Swal !== "undefined") {
                Swal.fire({
                    icon: "error",
                    title: "Unable to Send",
                    text: "Please try again. If the problem continues, contact us directly."
                });
            } else {
                alert("Message send nahi hua. Please dobara try karein.");
            }

        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = "Send Message";
            }
        }
    });
}
