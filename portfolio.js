// --- Global Variables and Utility Functions ---
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
const body = document.body;
const toggleButton = document.getElementById("toggle-dark");
const navbar = document.querySelector(".navbar");
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section[id], header[id]"); // Select all sections with an ID
const typewriterElement = document.querySelector(".typewriter-text");
const heroTitle = "Priyanshu"; // Only the changing part
const projectCards = document.querySelectorAll(".project-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const scrollToTopButton = document.getElementById("scroll-to-top");
const currentYearSpan = document.getElementById("current-year");

// Function to set or remove dark mode class
const setDarkMode = (isDark) => {
  if (isDark) {
    body.classList.add("dark-mode");
    toggleButton.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    toggleButton.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
};

// --- Dark Mode Initialization & Toggle ---
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Check local storage for theme preference
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setDarkMode(savedTheme === "dark");
  } else if (prefersDarkMode.matches) {
    // If no saved theme, check system preference
    setDarkMode(true);
  } else {
    setDarkMode(false); // Default to light mode
  }

  // Listen for system theme changes
  prefersDarkMode.addEventListener("change", (event) => {
    // Only update if no explicit user preference is saved
    if (!localStorage.getItem("theme")) {
      setDarkMode(event.matches);
    }
  });
});

toggleButton.addEventListener("click", () => {
  setDarkMode(!body.classList.contains("dark-mode"));
});

// --- Sticky Navbar & Active Link ---
const adjustNavbar = () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  let currentActive = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navbar.offsetHeight - 10; // Adjust for navbar height
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentActive = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").includes(currentActive)) {
      item.classList.add("active");
    }
  });

  // Show/hide scroll to top button
  if (window.scrollY > window.innerHeight / 2) { // Show after scrolling half of viewport height
    scrollToTopButton.classList.add("show");
  } else {
    scrollToTopButton.classList.remove("show");
  }
};

window.addEventListener("scroll", adjustNavbar);
document.addEventListener("DOMContentLoaded", adjustNavbar); // Call on load for initial state

// Smooth scroll for nav links (optional, as CSS scroll-behavior: smooth handles most)
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - navbar.offsetHeight + 1, // Adjust for sticky navbar
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top functionality
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


// --- Fade-in on Scroll Animation ---
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeInObserver.unobserve(entry.target); // Stop observing once visible
      }
    });
  },
  {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px", // Start animation a bit before reaching the bottom of the viewport
  }
);

document.querySelectorAll(".fade-in").forEach((element) => {
  fadeInObserver.observe(element);
});

// --- Typewriter Effect for Hero Section ---
let charIndex = 0;
const typingSpeed = 100; // milliseconds per character
const deletingSpeed = 60;
const delayBetweenTexts = 1500; // milliseconds before typing starts again

const texts = ["Priyanshu", "a Developer", "a Learner", "a Creator"];
let textIndex = 0;

function type() {
  const currentText = texts[textIndex];
  if (charIndex < currentText.length) {
    typewriterElement.textContent += currentText.charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenTexts);
  }
}

function erase() {
  const currentText = texts[textIndex];
  if (charIndex > 0) {
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, deletingSpeed);
  } else {
    textIndex = (textIndex + 1) % texts.length; // Move to the next text
    setTimeout(type, typingSpeed + 200); // Start typing next text after a short delay
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typewriterElement) {
    setTimeout(type, 500); // Start the typewriter effect after a small delay
  }
});


// --- Particle.js Background (for Hero Section) ---
// Initialize particles.js when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#00b894", // Primary color
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00b894", // Primary color
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  } else {
    console.warn("particles.js not loaded. Hero background will be static.");
  }
});


// --- Smooth TILT effect on project cards ---
projectCards.forEach((card) => {
  const rect = card.getBoundingClientRect(); // Get initial dimensions

  card.addEventListener("mousemove", (e) => {
    // Recalculate rect on each move for accuracy (in case of scroll/resize)
    const currentRect = card.getBoundingClientRect();
    const x = e.clientX - currentRect.left; // X position within the element.
    const y = e.clientY - currentRect.top; // Y position within the element.

    const centerX = currentRect.width / 2;
    const centerY = currentRect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8; // Max 8 degrees rotation
    const rotateY = ((x - centerX) / centerX) * -8; // Max 8 degrees rotation

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.boxShadow = `0 ${
      Math.abs(rotateX) + Math.abs(rotateY) + 5
    }px ${
      Math.abs(rotateX) + Math.abs(rotateY) + 20
    }px rgba(0, 0, 0, 0.2)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.boxShadow = "0 4px 15px var(--shadow-light)"; // Reset to original shadow
  });
});

// --- Project Filtering ---
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');

        const filter = button.dataset.filter; // Get the filter category

        projectCards.forEach(card => {
            const cardCategories = card.dataset.category.split(' '); // Get card categories
            if (filter === 'all' || cardCategories.includes(filter)) {
                card.style.display = 'block'; // Show the card
                // Re-trigger fade-in if needed (optional, cards might already be visible)
                // card.classList.remove('visible');
                // fadeInObserver.observe(card); // Re-observe to fade in if hidden then shown
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });
});

// --- Parallax Effect for About Image (Optional, requires a .parallax-effect class on the image container) ---
const aboutImage = document.querySelector(".about-image img");

if (aboutImage) {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    const sectionTop = document.querySelector(".about-section").offsetTop;
    const sectionHeight = document.querySelector(".about-section").offsetHeight;

    // Only apply parallax when the section is in view
    if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
      const translateY = (scrollPosition - sectionTop) * 0.1; // Adjust multiplier for effect strength
      aboutImage.style.transform = `translateY(${translateY}px)`;
    }
  });
}

// --- Contact Form Label Animation ---
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Trigger on load for pre-filled inputs (e.g., browser auto-fill)
    if (input.value) {
        input.nextElementSibling.classList.add('active-label');
    }

    input.addEventListener('focus', () => {
        input.nextElementSibling.classList.add('active-label');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.nextElementSibling.classList.remove('active-label');
        }
    });
});