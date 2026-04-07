document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. Scroll Animations (Slide Up & Navbar)
  ========================================= */
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".slide-up").forEach(el => {
    observer.observe(el);
  });

  /* =========================================
     2. Advanced 3D Hover Tilt Effect (Menus only)
  ========================================= */
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top; 
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; 
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.boxShadow = `${-rotateY}px ${rotateX}px 30px rgba(192, 57, 43, 0.2)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.boxShadow = `none`;
    });
  });

  /* =========================================
     3. Classic Floating Pizzas (Moving Up Only)
  ========================================= */
  const pizzaContainer = document.getElementById("pizza-container");
  const numberOfIcons = 15; 
  const iconSrc = "assets/pizza_slice.png";

  for (let i = 0; i < numberOfIcons; i++) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("floating-wrapper");

    const icon = document.createElement("img");
    icon.src = iconSrc;
    icon.classList.add("floating-icon");

    // Purely upward float style as requested (no rotation)
    const startX = Math.random() * 100; // 0 to 100 vw
    const duration = Math.random() * 15 + 15; // 15s to 30s
    const delay = Math.random() * -30; // Random offset to start height
    const scale = Math.random() * 0.5 + 0.3; // Random size

    wrapper.style.left = `${startX}vw`;
    wrapper.style.animation = `floatBackground ${duration}s linear infinite`;
    wrapper.style.animationDelay = `${delay}s`;
    wrapper.style.width = `${15 * scale}vw`;
    wrapper.style.zIndex = Math.floor(Math.random() * -10);
    
    // No JS rotation or mouse follow - keeping it "Proper"

    wrapper.appendChild(icon);
    pizzaContainer.appendChild(wrapper);
  }

  // Hero Mouse Move Parallax (Keeping this active just for the hero text)
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animateParallax() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translate3d(${currentX * -20}px, ${currentY * -20}px, 0) rotateX(${currentY * -5}deg) rotateY(${currentX * 5}deg)`;
    }

    requestAnimationFrame(animateParallax);
  }
  animateParallax();
});
