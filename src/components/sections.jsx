import { useScrollReveal } from "../hooks/index.js";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import "../styles/components.css";
import { scrollToSection } from "./ExperiencePolish.jsx";

gsap.registerPlugin(ScrollTrigger, Observer);

export function Skills({ skills }) {
  const headerRef = useScrollReveal();
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);

  const allSkills = skills.flatMap((group) => group.tags);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    const tags = gsap.utils.toArray(".skill-marquee_tag", track);
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    gsap.from(marquee, {
      autoAlpha: 0,
      y: 24,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: marquee, start: "top 88%", once: true },
    });
    gsap.from(tags.slice(0, Math.ceil(allSkills.length / 2)), {
      x: 90,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.05,
      ease: "power3.out",
      clearProps: "opacity,visibility",
      scrollTrigger: { trigger: marquee, start: "top 88%", once: true },
    });

    const BASE_SPEED = 55;
    const state = { speed: 1, boost: 0 };
    let x = 0;
    let loopWidth = track.firstElementChild.offsetWidth;
    const measure = () => { loopWidth = track.firstElementChild.offsetWidth; };
    window.addEventListener("resize", measure);

    let hovering = false;
    let pointerX = 0;
    const setScale = tags.map((tag) => gsap.quickTo(tag, "scale", { duration: 0.35, ease: "power3.out" }));

    const tick = (time, deltaTime) => {
      const dt = Math.min(deltaTime, 50) / 1000;
      x += (-BASE_SPEED * state.speed + state.boost) * dt;
      x = gsap.utils.wrap(-loopWidth, 0, x);
      gsap.set(track, { x });

      if (finePointer) {
        tags.forEach((tag, i) => {
          if (!hovering) { setScale[i](1); return; }
          const r = tag.getBoundingClientRect();
          const d = Math.abs(pointerX - (r.left + r.width / 2));
          setScale[i](1 + 0.14 * Math.max(0, 1 - d / 220));
        });
      }
    };
    gsap.ticker.add(tick);

    const onEnter = () => { hovering = true; gsap.to(state, { speed: 0.12, duration: 0.7, ease: "power2.out", overwrite: "auto" }); };
    const onLeave = () => { hovering = false; gsap.to(state, { speed: 1, duration: 1, ease: "power2.inOut", overwrite: "auto" }); };
    const onMove = (e) => { pointerX = e.clientX; };
    marquee.addEventListener("pointerenter", onEnter);
    marquee.addEventListener("pointerleave", onLeave);
    marquee.addEventListener("pointermove", onMove);

    const observer = Observer.create({
      target: marquee,
      type: "pointer,touch",
      lockAxis: true,
      tolerance: 4,
      onPress: () => { marquee.classList.add("is-dragging"); gsap.killTweensOf(state, "boost"); state.boost = 0; },
      onDrag: (self) => { x += self.deltaX; state.boost = 0; },
      onRelease: (self) => {
        marquee.classList.remove("is-dragging");
        state.boost = gsap.utils.clamp(-2500, 2500, self.velocityX);
        gsap.to(state, { boost: 0, duration: 1.4, ease: "power3.out" });
      },
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: marquee,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (marquee.classList.contains("is-dragging")) return;
        state.boost = -gsap.utils.clamp(0, 500, Math.abs(self.getVelocity()) / 5);
        gsap.to(state, { boost: 0, duration: 0.9, ease: "power2.out", overwrite: "auto" });
      },
    });

    return () => {
      gsap.ticker.remove(tick);
      observer.kill();
      scrollTrigger.kill();
      window.removeEventListener("resize", measure);
      marquee.removeEventListener("pointerenter", onEnter);
      marquee.removeEventListener("pointerleave", onLeave);
      marquee.removeEventListener("pointermove", onMove);
    };
  }, { scope: marqueeRef });

  const group = (hidden) => (
    <ul className="skill-marquee_group" aria-hidden={hidden || undefined}>
      {allSkills.map((tag) => (
        <li className="skill-tag skill-marquee_tag" key={tag}>{tag}</li>
      ))}
    </ul>
  );

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header fade-up" ref={headerRef}>
          <div className="section-tag">What I Know</div>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>
        <div className="skill-marquee" ref={marqueeRef} aria-label="Skills and technologies">
          <div className="skill-marquee_track" ref={trackRef}>
            {group(false)}
            {group(true)}
          </div>
        </div>

      </div>
    </section>
  );
}


export function Experience({ experience }) {
  const headerRef = useScrollReveal();
  const timelineRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = gsap.utils.toArray(".timeline-item", timelineRef.current);
    gsap.from(items, {
      y: 30,
      autoAlpha: 0,
      duration: 0.75,
      stagger: 0.16,
      ease: "power2.out",
      scrollTrigger: { trigger: timelineRef.current, start: "top 82%", once: true },
    });
    gsap.fromTo(".timeline_progress", { scaleY: 0 }, {
      scaleY: 1,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 72%",
        end: "bottom 58%",
        scrub: 0.7,
      },
    });
  }, { scope: timelineRef });

  return (
    <section className="section section--alt" id="experience">
      <div className="container">
        <div className="section-header fade-up" ref={headerRef}>
          <div className="section-tag">My Journey</div>
          <h2 className="section-title">Work Experience</h2>
          <p className="journey_intro">The roles and experiences that have shaped the way I build for the web.</p>
        </div>
        <div className="timeline timeline--premium" ref={timelineRef}>
          <span className="timeline_progress" aria-hidden="true" />
          {experience.map((item, i) => (
            <TimelineItem key={`${item.company}-${item.date}`} index={i + 1} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ date, role, company, desc, index }) {
  return (
    <article className="timeline-item">
      <span className="timeline-item_dot" aria-hidden="true" />
      <div className="timeline-item_card">
        <div className="timeline-item_topline">
          <span className="timeline-item_index">0{index}</span>
          <span className="timeline-item_date">{date.trim()}</span>
        </div>
        <h3 className="timeline-item_role">{role}</h3>
        <div className="timeline-item_company">{company}</div>
        <p className="timeline-item_desc">{desc}</p>
      </div>
    </article>
  );
}

export function Education({ education }) {
  const headerRef = useScrollReveal();
  const educationRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = gsap.utils.toArray(".edu-card", educationRef.current);
    gsap.from(cards, {
      y: 28,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.14,
      ease: "power2.out",
      scrollTrigger: { trigger: educationRef.current, start: "top 84%", once: true },
    });
  }, { scope: educationRef });

  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header fade-up" ref={headerRef}>
          <div className="section-tag">Academic Background</div>
          <h2 className="section-title">Education</h2>
          <p className="journey_intro">A foundation in software engineering, strengthened through continued learning.</p>
        </div>
        <div className="edu_grid edu_grid--premium" ref={educationRef}>
          {education.map((edu, index) => (
            <EduCard key={edu.degree} index={index + 1} {...edu} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EduCard({ icon, degree, institution, year, index }) {
  return (
    <article className="edu-card edu-card--premium">
      <div className="edu-card_topline">
        <span className="edu-card_index">0{index} / EDUCATION</span>
        <span className="edu-card_icon" aria-hidden="true">{icon}</span>
      </div>
      <h3 className="edu-card_degree">{degree}</h3>
      <p className="edu-card_institution">{institution}</p>
      <span className="edu-card_year">{year}</span>
    </article>
  );
}


export function Projects({ projects }) {
  const headerRef = useScrollReveal();
  const projectsRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = gsap.utils.toArray(".project-card", projectsRef.current);
    gsap.from(cards, {
      y: 34,
      autoAlpha: 0,
      duration: 0.75,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 82%",
        once: true,
      },
    });
  }, { scope: projectsRef });

  return (
    <section className="section section--alt projects-section" id="projects">
      <div className="container">
        <div className="section-header fade-up" ref={headerRef}>
          <div className="section-tag">Selected Work</div>
          <h2 className="section-title">Projects that I have build for learning.</h2>
          <p className="projects_intro">These projects were built when I started my journey in development. Later on, I have uploaded them to GitHub, Render, and Vercel. Along that, I have also built full deployed application in company environments.</p>
        </div>
        <div className="projects_grid" ref={projectsRef}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} index={index + 1} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECT_ICONS = {
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" />
      <path d="M3 4h2.2l2.3 11.1a1 1 0 0 0 1 .8h9.1a1 1 0 0 0 1-.8L20 8H6.1" />
    </>
  ),
  weather: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  map: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  code: (
    <>
      <path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" />
    </>
  ),
};

function ProjectIcon({ name }) {
  return (
    <svg className="project-card_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PROJECT_ICONS[name] || PROJECT_ICONS.code}
    </svg>
  );
}

function ProjectCard({ index, icon, image, label, title, desc, tags, demo, github }) {
  const comingSoon = !demo && !github;

  const handleEnter = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    gsap.to(card, { y: -6, duration: 0.28, ease: "power2.out", overwrite: true });
    const preview = card.querySelector(".project-card_image");
    if (preview) gsap.to(preview, { scale: 1.045, duration: 0.55, ease: "power2.out", overwrite: true });
  };

  const handleLeave = (event) => {
    const card = event.currentTarget;
    gsap.to(card, { y: 0, duration: 0.35, ease: "power2.out", overwrite: true });
    const preview = card.querySelector(".project-card_image");
    if (preview) gsap.to(preview, { scale: 1, duration: 0.45, ease: "power2.out", overwrite: true });
  };

  return (
    <article className="project-card" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div className="project-card_thumb">
        {image ? (
          <img className="project-card_image" src={image} alt={`${title} project preview`} loading="lazy" />
        ) : (
          <div className="project-card_placeholder" aria-hidden="true">
            <span className="project-card_icon-wrap"><ProjectIcon name={icon} /></span><small>{label}</small>
          </div>
        )}
        <span className="project-card_index">0{index}</span>
        <div className="project-card_thumb-label">{label}</div>
      </div>
      <div className="project-card_body">
        <div className="project-card_heading-row">
          <h3 className="project-card_title">{title}</h3>
          <span className="project-card_arrow" aria-hidden="true">↗</span>
        </div>
        <p className="project-card_desc">{desc}</p>
        <div className="project-card_tags">
          {tags.map((tag) => <span className="project-card_tag" key={tag}>{tag}</span>)}
        </div>
        <div className="project-card_footer">
          {comingSoon ? (
            <span className="project-card_request">Available upon request</span>
          ) : (
            <div className="project-card_links">
              {demo && <a href={demo} target="_blank" rel="noreferrer" className="project-card_link">Live demo <span aria-hidden="true">↗</span></a>}
              {github && <a href={github} target="_blank" rel="noreferrer" className="project-card_link project-card_link--secondary">Source code <span aria-hidden="true">↗</span></a>}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}


import { useState } from "react";

export function Contact({ info }) {
  const headerRef = useScrollReveal();
  const contactRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorDetail, setErrorDetail] = useState("");
  const thanksRef = useRef(null);

  useGSAP(() => {
    if (status !== "sent" || !thanksRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".contact_thanks-icon", { scale: 0, rotation: -90, duration: 0.6, ease: "back.out(2)" })
      .from(".contact_thanks > h3, .contact_thanks > p, .contact_thanks > button", { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, "-=0.25");
  }, { scope: thanksRef, dependencies: [status] });

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = gsap.utils.toArray(".contact-reveal", contactRef.current);
    gsap.from(items, {
      y: 24,
      autoAlpha: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: { trigger: contactRef.current, start: "top 82%", once: true },
    });
  }, { scope: contactRef });

  const handleChange = (e) =>
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    if (e.target.elements._honey?.value) return;
    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${info.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio enquiry from ${form.name}`,
          _replyto: form.email,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === "false" || data.success === false) {
        throw new Error(data.message || "Request failed");
      }
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch (err) {
      console.error("Contact form error:", err);
      setErrorDetail(err?.message || "Network error");
      setStatus("error");
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header fade-up" ref={headerRef}>
          <div className="section-tag">Let's Connect</div>
          <h2 className="section-title">Have a good project in mind?</h2>
          <p className="contact_intro">I'm open to junior developer opportunities, collaborations, and thoughtful conversations.</p>
        </div>

        <div className="contact_wrap contact_wrap--premium" ref={contactRef}>
          <aside className="contact_panel contact-reveal">
            <span className="contact_panel-kicker">GET IN TOUCH</span>
            <h3>Let's build something <em>meaningful.</em></h3>
            <p className="contact_panel-copy">
              Currently open to internship and junior developer roles in Sweden.
              If you have an opportunity or just want to say hello, I'd be happy to hear from you.
            </p>
            <div className="contact_availability"><span aria-hidden="true" /> Available for opportunities</div>
            <div className="social-links social-links--premium">
              <a href={`mailto:${info.email}`} className="social-link">
                <span className="social-link_icon" aria-hidden="true">✉</span>
                <span><small>Email</small><strong>{info.email}</strong></span>
                <span className="social-link_arrow" aria-hidden="true">↗</span>
              </a>
              <a href={info.linkedin} target="_blank" rel="noreferrer" className="social-link">
                <span className="social-link_icon" aria-hidden="true">in</span>
                <span><small>LinkedIn</small><strong>Connect professionally</strong></span>
                <span className="social-link_arrow" aria-hidden="true">↗</span>
              </a>
              <a href={info.github} target="_blank" rel="noreferrer" className="social-link">
                <span className="social-link_icon" aria-hidden="true">⌘</span>
                <span><small>GitHub</small><strong>Explore my code</strong></span>
                <span className="social-link_arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>

          {status === "sent" ? (
            <div className="contact_form contact_form--premium contact_thanks contact-reveal" ref={thanksRef} role="status" aria-live="polite">
              <span className="contact_thanks-icon" aria-hidden="true">✓</span>
              <h3>Your email has been sent!</h3>
              <p>Thank you for reaching out, I really appreciate it. I'll read your message and get back to you as soon as I can.</p>
              <button type="button" className="btn btn--outline" onClick={() => setStatus("idle")}>Send another message</button>
            </div>
          ) : (
            <form className="contact_form contact_form--premium contact-reveal" onSubmit={handleSubmit}>
              <div className="contact_form-heading">
                <span className="contact_form-number">01 — YOUR MESSAGE</span>
                <h3>Send an enquiry</h3>
                <p>Fill in the details and your message will be delivered straight to my inbox.</p>
              </div>
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
              <div className="form-group">
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" type="text" placeholder="e.g. Anna Lindström" value={form.name} onChange={handleChange} autoComplete="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} autoComplete="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">How can I help?</label>
                <textarea id="message" name="message" placeholder="Tell me a little about the opportunity or project..." value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn--primary contact_submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : <>Send email <span aria-hidden="true">↗</span></>}
              </button>
              {status === "error" ? (
                <div className="contact_form-note contact_form-note--error" role="alert">
                  <p>Sorry, your message couldn't be sent automatically{errorDetail ? ` (${errorDetail})` : ""}.</p>
                  <a
                    className="contact_form-fallback"
                    href={`mailto:${info.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${form.name}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`}
                  >
                    Send it with my email app instead
                  </a>
                </div>
              ) : (
                <p className="contact_form-note">Your details are only used to reply to your message.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer({ name }) {
  return (
    <footer className="footer footer--premium">
      <div className="container footer_inner">
        <a className="footer_brand" href="#home" onClick={(event) => { event.preventDefault(); scrollToSection("home"); }} aria-label={`${name}, back to top`}>RI<span>.</span></a>
        <p>Designed & built by <a href="#home" onClick={(event) => { event.preventDefault(); scrollToSection("home"); }}>{name}</a><span className="footer_separator">·</span> Uppsala, Sweden</p>
        <a className="footer_top" href="#home" onClick={(event) => { event.preventDefault(); scrollToSection("home"); }}>Back to top <span aria-hidden="true">↑</span></a>
      </div>
      <div className="footer_bottom">© {new Date().getFullYear()} {name}. Built with care.</div>
    </footer>
  );
}
