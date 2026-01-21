document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
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

    var introTl = gsap.timeline({ defaults: { ease: "back", delay: 0.4 } });

    introTl
      .from(".hero-text h1", {
        opacity: 0,
        x: 50,
        duration: 1.5,
      })

      .to(
        ".star",
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      )

      .fromTo(
        ".navbar",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=1"
      )

      .from(".links", { opacity: 0, duration: 0.8 }, "<");

    gsap.utils.toArray(".work-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.92, // ⬅️ card starts slightly smaller
        },
        {
          opacity: 1,
          y: 0,
          scale: 1, // ⬅️ grows as it overlaps
          duration: 1.2,
          ease: "power3.out",

          scrollTrigger: {
            trigger: card,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

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
          start: "top 80%",
          toggleActions: "play none none reverse", // or "play none none none" if you don't want it to reverse
        },
        onUpdate: () => {
          stat.textContent = Math.floor(counter.value) + suffix;
        },
      });
    });

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
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
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
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".capsule", {
      scale: 0.3,
      duration: 1.5,
      scrollTrigger: {
        trigger: ".capsule",
        scroller: "body",
        start: "top 90%",
        end: "top 10%",
        ease: "back",
        scrub: 1,
      },
    });

    var layoutTl = gsap.timeline({
      defaults: { duration: 0.8, ease: "back" },
      scrollTrigger: {
        trigger: ".space-layout",
        start: "top 80%",
      },
    });

    layoutTl
      .from(".main-box", { x: -100, opacity: 0 })
      .from(".service-box", { x: 100, opacity: 0 });

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
});
