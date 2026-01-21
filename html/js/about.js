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

  //Responsive
  let mm = gsap.matchMedia();

  mm.add("(min-width:1025px)", () => {
    // about section
    const split = new SplitText(".about-text", {
      type: "lines",
    });

    gsap.from(split.lines, {
      opacity: 0,
      yPercent: 20,
      duration: 1.3,
      ease: "power3.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: ".about",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // display section
    var realzTl = gsap.timeline({
      scrollTrigger: { trigger: ".display", start: "top 75%" },
    });

    realzTl
      .from(".imag #dhead", { y: -70, opacity: 0, duration: 1 })
      .from(".imag .d-post", { y: 70, opacity: 0, duration: 1 }, "<")
      .from(".realz #dhead", { y: -100, opacity: 0, duration: 1 }, "<")
      .from(".realz .d-post", { y: 100, opacity: 0, duration: 1 }, "<")
      .from(".distr #dhead", { y: -50, opacity: 0, duration: 1 }, "<")
      .from(".distr .d-post", { y: 50, opacity: 0, duration: 1 }, "<");

    //stat
    gsap.utils.toArray(".count").forEach((stat) => {
      const endValue = parseFloat(stat.dataset.value);
      const suffix = stat.dataset.suffix || "";

      const counter = { value: 0 };

      gsap.to(counter, {
        value: endValue,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 75%",
          toggleActions: "play none none reverse", // or "play none none none" if you don't want it to reverse
        },
        onUpdate: () => {
          stat.textContent = Math.floor(counter.value) + suffix;
        },
      });
    });

    //team section
    const textSplit = new SplitText(".team-text", {
      type: "lines",
    });

    gsap.from(textSplit.lines, {
      opacity: 0,
      yPercent: 20,
      duration: 1.3,
      ease: "power3.out",
      stagger: 0.5,
      scrollTrigger: {
        trigger: ".team",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    //timeline section
    gsap.from(".time-sec-b", {
      x: -150,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: { trigger: ".time-sec", start: "top 75%" },
    });

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
  });

  mm.add("(max-width:1024px)", () => {
    // about section
    const split = new SplitText(".about-text", {
      type: "lines",
    });

    gsap.from(split.lines, {
      opacity: 0,
      yPercent: 20,
      duration: 1.3,
      ease: "power3.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: ".about",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // display section
    var realzTl = gsap.timeline({
      scrollTrigger: { trigger: ".display", start: "top 70%" },
    });

    realzTl
      .from(".imag #dhead", { y: -70, opacity: 0, duration: 1 })
      .from(".imag .d-post", { y: 70, opacity: 0, duration: 1 }, "<")
      .from(".realz #dhead", { y: -100, opacity: 0, duration: 1 }, "<")
      .from(".realz .d-post", { y: 100, opacity: 0, duration: 1 }, "<")
      .from(".distr #dhead", { y: -50, opacity: 0, duration: 1 }, "<")
      .from(".distr .d-post", { y: 50, opacity: 0, duration: 1 }, "<");

    //stat
    gsap.utils.toArray(".count").forEach((stat) => {
      const endValue = parseFloat(stat.dataset.value);
      const suffix = stat.dataset.suffix || "";

      const counter = { value: 0 };

      gsap.to(counter, {
        value: endValue,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 70%",
          toggleActions: "play none none reverse", // or "play none none none" if you don't want it to reverse
        },
        onUpdate: () => {
          stat.textContent = Math.floor(counter.value) + suffix;
        },
      });
    });

    //team section
    const textSplit = new SplitText(".team-text", {
      type: "lines",
    });

    gsap.from(textSplit.lines, {
      opacity: 0,
      yPercent: 20,
      duration: 1.3,
      ease: "power3.out",
      stagger: 0.5,
      scrollTrigger: {
        trigger: ".team",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    //timeline section
    gsap.from(".time-sec-b", {
      x: -150,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: { trigger: ".time-sec", start: "top 75%" },
    });

    //footer section
    var footerTl = gsap.timeline({
      scrollTrigger: { trigger: ".footer", start: "top 60%" },
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
  });

  mm.add("(max-width:768px)", () => {
    // about section
    const split = new SplitText(".about-text", {
      type: "lines",
    });

    gsap.from(split.lines, {
      opacity: 0,
      yPercent: 20,
      duration: 1.3,
      ease: "power3.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // display section
    var realzTl = gsap.timeline({
      scrollTrigger: { trigger: ".display", start: "top 85%" },
    });

    realzTl
      .from(".imag #dhead", { y: -70, opacity: 0, duration: 1 })
      .from(".imag .d-post", { y: 70, opacity: 0, duration: 1 }, "<")
      .from(".realz #dhead", { y: -100, opacity: 0, duration: 1 }, "<")
      .from(".realz .d-post", { y: 100, opacity: 0, duration: 1 }, "<")
      .from(".distr #dhead", { y: -50, opacity: 0, duration: 1 }, "<")
      .from(".distr .d-post", { y: 50, opacity: 0, duration: 1 }, "<");

    //stat
    gsap.utils.toArray(".count").forEach((stat) => {
      const endValue = parseFloat(stat.dataset.value);
      const suffix = stat.dataset.suffix || "";

      const counter = { value: 0 };

      gsap.to(counter, {
        value: endValue,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 75%",
          toggleActions: "play none none reverse", // or "play none none none" if you don't want it to reverse
        },
        onUpdate: () => {
          stat.textContent = Math.floor(counter.value) + suffix;
        },
      });
    });

    //team section
    const textSplit = new SplitText(".team-text", {
      type: "lines",
    });

    gsap.from(textSplit.lines, {
      opacity: 0,
      yPercent: 20,
      duration: 1.3,
      ease: "power3.out",
      stagger: 0.5,
      scrollTrigger: {
        trigger: ".team",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
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
