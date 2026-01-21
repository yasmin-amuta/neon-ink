document.addEventListener("DOMContentLoaded", (event) => {
  // Select elements
  const pill = document.querySelector(".pill");
  const links = pill.querySelector(".pill-links");
  const label = pill.querySelector(".pill-label");

  let isOpen = false;

  // ---------- WIDTH CALCULATION ----------
  function getCollapsedWidth() {
    pill.classList.add("collapsed");
    links.style.display = "none";
    const w = pill.getBoundingClientRect().width;
    return w;
  }

  function getExpandedWidth() {
    pill.classList.remove("collapsed");
    links.style.display = "flex";
    const w = pill.getBoundingClientRect().width;
    return w;
  }

  // First-time width calculation
  let collapsedWidth = getCollapsedWidth();
  let expandedWidth = getExpandedWidth();

  // Reset state to collapsed at start
  pill.style.width = collapsedWidth + "px";
  pill.classList.add("collapsed");
  links.style.display = "none";

  // ---------- GSAP TIMELINE ----------
  const tl = gsap.timeline({ paused: true });

  tl.to(pill, {
    width: expandedWidth,
    duration: 0.35,
    ease: "power2.out",
  });

  // ---------- OPEN / CLOSE ----------
  pill.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      // Open
      links.style.display = "flex";
      pill.classList.remove("collapsed");
      tl.play();
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      // Close
      tl.reverse().then(() => {
        links.style.display = "none";
        pill.classList.add("collapsed");
        pill.style.width = collapsedWidth + "px";
        document.body.style.overflow = "auto"; // unlock scroll
      });
    }
  });

  //hero section
  var heroTl = gsap.timeline({
    defaults: { delay: 0.3, duration: 0.5, ease: "back" },
  });

  heroTl
    .from(".hero-top h1", { x: -40, opacity: 0 })
    .from(".hero-top .breadcrumb", { x: 40, opacity: 0 }, "<")
    .from(".hero-bottom h2", { x: -40, opacity: 0 }, "-=0.5")
    .from(".hero-bottom p", { x: 40, opacity: 0 }, "<");

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  gsap.from(".right-head img", {
    y: -200,
    x: -700,
    duration: 5,
    rotation: 360,
    scale: 2,
    ease: "easeOut",
    scrollTrigger: { trigger: ".contact", start: "top 80%" },
  });

  //stalk section
  gsap.from(".stalk h1", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "back",
    scrollTrigger: { trigger: ".stalk", start: "top 80%" },
  });

  // faq section
  var accordSection = gsap.timeline({
    defaults: { duration: 0.6, ease: "back" },
    scrollTrigger: { trigger: ".container", start: "top 80%" },
  });

  accordSection
    .from(".sidebar", { x: 100, opacity: 0 })
    .from(".sidebar h2", { y: 50, opacity: 0 }, "-=0.5")
    .from(".question", { x: -100, opacity: 0 });

  gsap.from(".footer-left", {
    xPercent: -20,
    duration: 0.8,
    ease: "back",
    scrollTrigger: { trigger: ".footer", start: "top 80%" },
  });

  // Cursor movement
  const cursor = document.querySelector(".custom-cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  });

  // Add hover effect on cursor when hovering over elements with class 'hover-target'
  document.querySelectorAll(".hover-target").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });
});
