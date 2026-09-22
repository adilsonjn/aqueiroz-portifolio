const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const year = document.querySelector("#current-year");
const reveals = document.querySelectorAll(".reveal");

if (year) {
    year.textContent = new Date().getFullYear();
}

const closeMenu = () => {
    if (!nav || !navToggle) return;

    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
};

if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-open", isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });
}

const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    reveals.forEach((element) => observer.observe(element));
} else {
    reveals.forEach((element) => element.classList.add("visible"));
}


const technologyLogos = document.querySelectorAll(".logo-item img");

technologyLogos.forEach((image) => {
    const markFailed = () => {
        image.closest(".logo-item")?.classList.add("logo-load-failed");
    };

    image.addEventListener("error", markFailed);

    if (image.complete && image.naturalWidth === 0) {
        markFailed();
    }
});
