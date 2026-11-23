
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Reliable responsive section navigation
export function scrollToSection(id) {
  const target = document.getElementById(id);

  if (!target) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Return to the top
  if (id === "home" || id === "top") {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    return;
  }

  // Calculate the actual navbar height
  const navbar = document.querySelector(".navbar");

  const navbarHeight = navbar
    ? navbar.getBoundingClientRect().height
    : 0;

  // Calculate the target's current document position
  const targetPosition =
    window.scrollY + target.getBoundingClientRect().top;

  // Leave a small gap below the fixed navbar
  const offset = navbarHeight + 12;

  const destination = Math.max(
    0,
    targetPosition - offset
  );

  // Use native scrolling for mobile and desktop
  window.scrollTo({
    top: destination,
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

export default function ExperiencePolish() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;

      // Reading progress indicator
      const progress = document.querySelector(
        ".reading-progress_bar"
      );

      if (progress && !reduceMotion) {
        gsap.to(progress, {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        });
      }

      // Custom cursor (desktop only)
      if (!finePointer || reduceMotion) return;

      const cursor = root.current?.querySelector(
        ".cursor-follower"
      );

      if (!cursor) return;

      const xTo = gsap.quickTo(cursor, "x", {
        duration: 0.22,
        ease: "power3",
      });

      const yTo = gsap.quickTo(cursor, "y", {
        duration: 0.22,
        ease: "power3",
      });

      const onMove = (event) => {
        xTo(event.clientX);
        yTo(event.clientY);
      };

      const onOver = (event) => {
        if (
          event.target.closest(
            "a, button, input, textarea, select"
          )
        ) {
          cursor.classList.add("is-hovering");
        }
      };

      const onOut = (event) => {
        if (
          event.target.closest(
            "a, button, input, textarea, select"
          )
        ) {
          cursor.classList.remove("is-hovering");
        }
      };

      window.addEventListener("pointermove", onMove, {
        passive: true,
      });

      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerout", onOut);

      return () => {
        window.removeEventListener("pointermove", onMove);

        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerout", onOut);
      };
    },
    { scope: root }
  );

  return (
    <div
      className="experience-polish"
      ref={root}
      aria-hidden="true"
    >
      <div className="reading-progress">
        <span className="reading-progress_bar" />
      </div>

      <span className="cursor-follower" />
    </div>
  );
}
