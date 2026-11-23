
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useActiveSection } from "../hooks/index.js";
import { scrollToSection } from "./ExperiencePolish.jsx";
import "../styles/Navbar.css";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { href: "about", label: "About" },
  { href: "skills", label: "Skills" },
  { href: "experience", label: "Experience" },
  { href: "education", label: "Education" },
  { href: "projects", label: "Projects" },
];

const SECTION_IDS = [...NAV_LINKS.map(({ href }) => href), "contact"];

export default function Navbar({ name }) {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const menuTimeline = useRef(null);
  const initialMenuRender = useRef(true);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const active = useActiveSection(SECTION_IDS);

  // Navbar entrance animation
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      gsap.from(".navbar_inner", {
        y: -18,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".navbar_links li", {
        y: -7,
        autoAlpha: 0,
        duration: 0.45,
        stagger: 0.055,
        delay: 0.18,
        ease: "power2.out",
      });
    },
    { scope: navRef }
  );

  // Mobile menu animation
  useEffect(() => {
    const menu = menuRef.current;

    if (!menu) return;

    menuTimeline.current?.kill();

    const links = menu.querySelectorAll(".navbar_mobile-link");

    if (initialMenuRender.current) {
      initialMenuRender.current = false;

      gsap.set(menu, {
        height: 0,
        autoAlpha: 0,
        visibility: "hidden",
        pointerEvents: "none",
      });

      return;
    }

    if (window.innerWidth > 768) {
      gsap.set(menu, {
        clearProps: "all",
      });
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (menuOpen) {
      gsap.set(menu, {
        visibility: "visible",
        pointerEvents: "auto",
      });

      if (reduceMotion) {
        gsap.set(menu, {
          height: "auto",
          autoAlpha: 1,
        });

        gsap.set(links, {
          y: 0,
          autoAlpha: 1,
        });

        return;
      }

      menuTimeline.current = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      menuTimeline.current
        .fromTo(
          menu,
          { height: 0, autoAlpha: 0 },
          {
            height: "auto",
            autoAlpha: 1,
            duration: 0.32,
          }
        )
        .fromTo(
          links,
          { y: -8, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.045,
            duration: 0.22,
          },
          "-=0.12"
        );
    } else {
      if (reduceMotion) {
        gsap.set(menu, {
          height: 0,
          autoAlpha: 0,
          visibility: "hidden",
          pointerEvents: "none",
        });

        return;
      }

      menuTimeline.current = gsap.timeline({
        onComplete: () => {
          gsap.set(menu, {
            height: 0,
            autoAlpha: 0,
            visibility: "hidden",
            pointerEvents: "none",
          });
        },
      });

      menuTimeline.current.to(menu, {
        height: 0,
        autoAlpha: 0,
        duration: 0.28,
        ease: "power2.inOut",
      });
    }

    return () => {
      menuTimeline.current?.kill();
    };
  }, [menuOpen]);

  // Scroll and keyboard events
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("keydown", onKeyDown);

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnDesktop);

    return () => {
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  // Navigation handler
  const scrollTo = (id) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <nav
      ref={navRef}
      className={`navbar${scrolled ? " navbar--scrolled" : ""}`}
      aria-label="Main navigation"
    >
      <div className="navbar_inner">
        <a
          href="#home"
          className="navbar_logo"
          onClick={(event) => {
            event.preventDefault();
            scrollTo("home");
          }}
          aria-label={`${name} — back to top`}
        >
          <span className="navbar_monogram" aria-hidden="true">
            RI
          </span>

          <span className="navbar_name">{name}</span>
        </a>

        <button
          className={`navbar_hamburger${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          type="button"
        >
          <span />
          <span />
        </button>

        <ul
          ref={menuRef}
          id="primary-navigation"
          className={`navbar_links${menuOpen ? " open" : ""}`}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} className="navbar_mobile-link">
              <a
                href={`#${href}`}
                className={active === href ? "active" : ""}
                aria-current={
                  active === href ? "location" : undefined
                }
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(href);
                }}
              >
                {label}
              </a>
            </li>
          ))}

          <li className="navbar_mobile-link navbar_contact-item">
            <a
              href="#contact"
              className="navbar_contact-link"
              onClick={(event) => {
                event.preventDefault();
                scrollTo("contact");
              }}
            >
              Let's talk <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
