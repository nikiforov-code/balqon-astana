const reveals = document.querySelectorAll(".reveal");

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

if (hero && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;

    hero.classList.add("is-moving");
    hero.style.setProperty("--hero-x", `${x}px`);
    hero.style.setProperty("--hero-y", `${y}px`);
  });

  hero.addEventListener("mouseleave", () => {
    hero.classList.remove("is-moving");
    hero.style.setProperty("--hero-x", "0px");
    hero.style.setProperty("--hero-y", "0px");
  });
}

const form = document.querySelector(".lead-form");

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
