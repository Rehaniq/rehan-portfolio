import { useState, useEffect } from "react";
import { useActiveSection } from "../hooks/index.js";
import "../styles/Navbar.css";

const NAV_LINKS = [
  { href: "about", label: "About" },
  { href: "skills", label: "Skills" },
  { href: "experience", label: "Experience" },
  { href: "education", label: "Education" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" },
];

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <a href="#" className="navbar__logo">{name}</a>

      <button
        className="navbar__hamburger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <ul className={`navbar__links${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={`#${href}`}
              className={active === href ? "active" : ""}
              onClick={(e) => { e.preventDefault(); scrollTo(href); }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
