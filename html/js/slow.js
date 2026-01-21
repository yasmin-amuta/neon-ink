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

  gsap.from(".wally-head #title", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "back",
    scrollTrigger: { trigger: ".wally", start: "top 80%" },
  });

  //overview
  var overSection = gsap.timeline({
    defaults: { duration: 0.8, ease: "back" },
    scrollTrigger: { trigger: ".overview", start: "top 80%" },
  });

  overSection
    .from(".overview", {
      xPercent: -100,
      opacity: 0,
      stagger: 0.4,
    })
    .from(".overview h3", { y: 50, opacity: 0 });

  //footer section
  var footerTl = gsap.timeline({
    scrollTrigger: { trigger: ".footer", start: "top 75%" },
  });

  footerTl
    .from(".footer-right img", {
      y: -300,
      x: -700,
      duration: 5,
      scale: 2,
      ease: "easeOut",
    })
    .from(".footer-left", { x: -20, duration: 1 }, "<")
    .from(".footer-right form", { x: 20, duration: 1 }, "<");

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
