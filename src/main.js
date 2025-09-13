import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function applyVisualHeight(el) {
  if (!el || !el.parentElement) return;

  const s = parseFloat(getComputedStyle(el).getPropertyValue("--sy") || "1");
  const scale = isFinite(s) ? s : 1;

  const prev = el.style.transform;
  const parent = el.parentElement;

  // Reset parent height to avoid compounding from previous runs
  parent.style.height = "";

  // Measure with transform disabled
  el.style.transform = "none";
  const h = el.offsetHeight;
  const other = parent.offsetHeight - h;

  // Restore and apply
  el.style.transform = prev || `scaleY(${scale})`;
  parent.style.height = `${other + h * scale}px`;
}

// window.addEventListener("scroll", () => {
//   console.log(window.scrollY, document.body.offsetHeight, window.innerHeight);
// });

applyVisualHeight(document.querySelector(".fastfashion"));
window.addEventListener("resize", () => {
  applyVisualHeight(document.querySelector(".fastfashion"));
});

function fixWhyIsItBad() {
  const whytextWidth = parseFloat(
    getComputedStyle(document.querySelector(".question-2")).width,
  );

  document.querySelector(
    ".question-2",
  ).parentElement.style.gridTemplateColumns = `${whytextWidth * 0.5}px 1fr`;
}

fixWhyIsItBad();

window.addEventListener("resize", () => {
  fixWhyIsItBad();
});

ScrollSmoother.create({
  smooth: 0.75,
  effects: true,
  smoothTouch: 0.1,
});

ScrollTrigger.create({
  trigger: ".container-1",
  start: "top top",
  endTrigger: ".fastfashion",
  end: "bottom bottom",
  pin: true,
  pinSpacing: false,
  onUpdate: (self) => {
    gsap.to(".container-1", {
      scale: gsap.utils.clamp(0.8, 1, 1 - self.progress),
      padding: 32 * 4 * self.progress,
      ease: "power0.none",
      duration: 0,
    });

    gsap.to(".logo", {
      bottom:
        (window.innerHeight - document.querySelector(".logo").offsetHeight) *
        self.progress,
      ease: "power0.none",
      duration: 0,
    });
  },
});

ScrollTrigger.create({
  trigger: ".container-2",
  start: "bottom bottom",
  endTrigger: ".reasons.q3",
  end: "top top",
  pin: true,
  pinSpacing: false,
  onUpdate: (self) => {
    gsap.to(".container-2", {
      scale: gsap.utils.clamp(0.8, 1, 1 - self.progress),
      ease: "power0.none",
      duration: 0,
    });
  },
});
