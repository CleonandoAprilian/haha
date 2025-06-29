document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Mobile menu toggle
  const navbarToggle = document.getElementById("navbar-toggle");
  const navbarMenu = document.getElementById("navbar-menu");

  navbarToggle.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");

    const icon = navbarToggle.querySelector("i");
    if (navbarMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking on nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("active");
      const icon = navbarToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // === Main Slideshow ===
  (function () {
    const slides = document.querySelectorAll(".slideshow img");
    const nextBtn = document.querySelector(".slideshow .next");
    const prevBtn = document.querySelector(".slideshow .prev");
    let currentMainSlide = 0;

    function showMainSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) slide.classList.add("active");
      });
    }

    function nextMainSlide() {
      currentMainSlide = (currentMainSlide + 1) % slides.length;
      showMainSlide(currentMainSlide);
    }

    function prevMainSlide() {
      currentMainSlide = (currentMainSlide - 1 + slides.length) % slides.length;
      showMainSlide(currentMainSlide);
    }

    nextBtn?.addEventListener("click", nextMainSlide);
    prevBtn?.addEventListener("click", prevMainSlide);
    setInterval(nextMainSlide, 3000);
  })();

  // Menu card slider
  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".menu-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".menu-filter .active")?.classList.remove("active");
      button.classList.add("active");

      const category = button.getAttribute("data-filter");

      cards.forEach((card) => {
        const match = card.getAttribute("data-category") === category || category === "all";
        card.style.display = match ? "block" : "none";
      });
    });
  });

  // // ==== Location scroll button ====
  // const scrollContainer = document.querySelector(".location-cards");
  // const scrollLeftBtn = document.getElementById("scroll-left");
  // const scrollRightBtn = document.getElementById("scroll-right");

  // if (scrollLeftBtn && scrollRightBtn && scrollContainer) {
  //   scrollLeftBtn.addEventListener("click", () => {
  //     scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
  //   });

  //   scrollRightBtn.addEventListener("click", () => {
  //     scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
  //   });
  // }

  // === Testimonial Slider ===
  (function () {
    const testimonialSlider = document.getElementById("testimonial-slider");
    const testimonialCards = testimonialSlider?.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".dot");
    let currentTestimonial = 0;

    if (testimonialCards.length > 0) {
      testimonialCards.forEach((card, index) => {
        if (index !== 0) card.style.display = "none";
      });

      function showTestimonialSlide(n) {
        testimonialCards.forEach((card) => (card.style.display = "none"));
        dots.forEach((dot) => dot.classList.remove("active"));

        testimonialCards[n].style.display = "block";
        dots[n].classList.add("active");
        currentTestimonial = n;
      }

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showTestimonialSlide(index);
        });
      });

      setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonialSlide(currentTestimonial);
      }, 5000);
    }
  })();

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });

  // Reveal effect
  const revealElements = document.querySelectorAll(".benefit-card, .feature-card, .menu-card, .location-card, .package-card");

  function revealOnScroll() {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  window.addEventListener("load", revealOnScroll);
  window.addEventListener("scroll", revealOnScroll);
});
