import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../styles/Hero.css";
import { scrollToSection } from "./ExperiencePolish.jsx";

gsap.registerPlugin(useGSAP);

export default function Hero({ info, stats }) {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.12,
      });

      intro
        .from(".hero_eyebrow-line", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.45,
        })
        .from(
          ".hero_eyebrow-label",
          { autoAlpha: 0, y: 8, duration: 0.45 },
          "-=0.2"
        )
        .from(
          ".hero_title-line-inner",
          {
            yPercent: 110,
            autoAlpha: 0,
            duration: 0.85,
            stagger: 0.13,
          },
          "-=0.12"
        )
        .from(
          ".hero_bio",
          { autoAlpha: 0, y: 18, duration: 0.65 },
          "-=0.42"
        )
        .from(
          ".hero_cta .btn",
          { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.1 },
          "-=0.35"
        )
        .from(
          ".hero-card",
          { autoAlpha: 0, y: 24, scale: 0.97, duration: 0.85 },
          "-=0.62"
        )
        .from(
          ".hero-card_avatar, .hero-card_identity, .hero-card_stats, .status-badge",
          {
            autoAlpha: 0,
            y: 10,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.42"
        );

      gsap.to(".hero-card", {
        y: -6,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4,
      });

    },
    { scope: heroRef }
  );

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero_text">
        <div className="hero_eyebrow">
          <span className="hero_eyebrow-line" aria-hidden="true" />
          <span className="hero_eyebrow-label">
            {info.available ? "Available for opportunities" : "Currently unavailable"}
          </span>
        </div>

        <h1 className="hero_title">
          <span className="hero_title-line"><span className="hero_title-line-inner">Full Stack</span></span>
          <span className="hero_title-line"><span className="hero_title-line-inner"><em>Developer</em></span></span>
          <span className="hero_title-line"><span className="hero_title-line-inner">based in Sweden</span></span>
        </h1>

        <p className="hero_bio">{info.bio}</p>

        <div className="hero_cta">
          <a
            href="#projects"
            className="btn btn--primary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
          >
            View Projects <span aria-hidden="true">→</span>
          </a>
          <a
            href="#contact"
            className="btn btn--outline"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div className="hero_visual" aria-label="Developer profile">
        <div className="hero-card">
          <div className="hero-card_avatar" aria-hidden="true">RI</div>
          <div className="hero-card_identity">
            <h3>{info.name}</h3>
            <p>{info.title} · {info.location}</p>
          </div>

          <div className="hero-card_stats">
            {stats.map(({ num, label }) => (
              <div className="stat" key={label}>
                <span className="stat_num">{num}</span>
                <span className="stat_label">{label}</span>
              </div>
            ))}
          </div>

          {info.available && <div className="status-badge">Open to Work</div>}
        </div>
      </div>
    </section>
  );
}
