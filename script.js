const reveals = document.querySelectorAll(".reveal");
const header = document.querySelector(".site-header");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

reveals.forEach((element) => revealObserver.observe(element));

const hero = document.querySelector(".hero");

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (hero && window.matchMedia("(pointer: fine)").matches) {
  const heroMotion = {
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    glowX: 72,
    glowY: 28,
    targetGlowX: 72,
    targetGlowY: 28,
    frame: null,
  };

  const animateHero = () => {
    heroMotion.currentX += (heroMotion.targetX - heroMotion.currentX) * 0.08;
    heroMotion.currentY += (heroMotion.targetY - heroMotion.currentY) * 0.08;
    heroMotion.glowX += (heroMotion.targetGlowX - heroMotion.glowX) * 0.1;
    heroMotion.glowY += (heroMotion.targetGlowY - heroMotion.glowY) * 0.1;

    hero.style.setProperty("--hero-x", `${heroMotion.currentX.toFixed(2)}px`);
    hero.style.setProperty("--hero-y", `${heroMotion.currentY.toFixed(2)}px`);
    hero.style.setProperty("--hero-glow-x", `${heroMotion.glowX.toFixed(2)}%`);
    hero.style.setProperty("--hero-glow-y", `${heroMotion.glowY.toFixed(2)}%`);

    const isSettled =
      Math.abs(heroMotion.targetX - heroMotion.currentX) < 0.02 &&
      Math.abs(heroMotion.targetY - heroMotion.currentY) < 0.02 &&
      Math.abs(heroMotion.targetGlowX - heroMotion.glowX) < 0.02 &&
      Math.abs(heroMotion.targetGlowY - heroMotion.glowY) < 0.02;

    if (isSettled && !hero.classList.contains("is-moving")) {
      heroMotion.frame = null;
      return;
    }

    heroMotion.frame = requestAnimationFrame(animateHero);
  };

  const requestHeroFrame = () => {
    if (!heroMotion.frame) {
      heroMotion.frame = requestAnimationFrame(animateHero);
    }
  };

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    hero.classList.add("is-moving");
    heroMotion.targetX = (relativeX - 0.5) * 9;
    heroMotion.targetY = (relativeY - 0.5) * 6;
    heroMotion.targetGlowX = relativeX * 100;
    heroMotion.targetGlowY = relativeY * 100;
    requestHeroFrame();
  });

  hero.addEventListener("mouseleave", () => {
    hero.classList.remove("is-moving");
    heroMotion.targetX = 0;
    heroMotion.targetY = 0;
    heroMotion.targetGlowX = 72;
    heroMotion.targetGlowY = 28;
    requestHeroFrame();
  });
}

const form = document.querySelector(".lead-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const originalText = button.textContent;

    button.textContent = "Заявка отправлена";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      form.reset();
    }, 2600);
  });
}

const comparison = document.querySelector(".before-after");

if (comparison) {
  const slider = comparison.querySelector("input");

  slider.addEventListener("input", (event) => {
    comparison.style.setProperty("--split", `${event.target.value}%`);
  });
}
