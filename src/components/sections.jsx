import { useScrollReveal } from "../hooks/index.js";
import "../styles/components.css";

function SkillCategory({ category, tags }) {
  const ref = useScrollReveal();
  return (
    <div className="skill-category fade-up" ref={ref}>
      <div className="skill-category__title">{category}</div>
      <div className="skill-tags">
        {tags.map((tag) => (
          <span className="skill-tag" key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export function Skills({ skills }) {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">What I Know</div>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>
        <div className="skills__grid">
          {skills.map((s) => (
            <SkillCategory key={s.category} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}


export function Experience({ experience }) {
  return (
    <section className="section section--alt" id="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">My Journey</div>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div className="timeline">
          {experience.map((item, i) => (
            <TimelineItem key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ date, role, company, desc }) {
  const ref = useScrollReveal();
  return (
    <div className="timeline-item fade-up" ref={ref}>
      <div className="timeline-item__dot" />
      <div className="timeline-item__meta">
        <span className="timeline-item__date">{date}</span>
      </div>
      <div className="timeline-item__role">{role}</div>
      <div className="timeline-item__company">{company}</div>
      <div className="timeline-item__desc">{desc}</div>
    </div>
  );
}



export function Education({ education }) {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Academic Background</div>
          <h2 className="section-title">Education</h2>
        </div>
        <div className="edu__grid">
          {education.map((edu) => (
            <EduCard key={edu.degree} {...edu} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EduCard({ icon, degree, institution, year }) {
  const ref = useScrollReveal();
  return (
    <div className="edu-card fade-up" ref={ref}>
      <div className="edu-card__icon">{icon}</div>
      <div className="edu-card__degree">{degree}</div>
      <div className="edu-card__institution">{institution}</div>
      <div className="edu-card__year">{year}</div>
    </div>
  );
}


export function Projects({ projects }) {
  return (
    <section className="section section--alt" id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">My Work</div>
          <h2 className="section-title">Projects</h2>
        </div>
        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ emoji, label, title, desc, tags, demo, github }) {
  const ref = useScrollReveal();
  const comingSoon = !demo && !github;

  return (
    <div className="project-card fade-up" ref={ref}>
      <div className="project-card__thumb">
        {emoji}
        <div className="project-card__thumb-label">{label}</div>
      </div>
      <div className="project-card__body">
        <div className="project-card__title">{title}</div>
        <div className="project-card__desc">{desc}</div>
        <div className="project-card__tags">
          {tags.map((t) => (
            <span className="project-card__tag" key={t}>{t}</span>
          ))}
        </div>
        {comingSoon ? (
          <span className="project-card__request">Upon Request</span>
        ) : (
          <div className="project-card__links">
            {demo && <a href={demo} target="_blank" rel="noreferrer" className="project-card__link">↗ Live Demo</a>}
            {github && <a href={github} target="_blank" rel="noreferrer" className="project-card__link">⌥ GitHub</a>}
          </div>
        )}
      </div>
    </div>
  );
}


import { useState } from "react";

export function Contact({ info }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Let's Connect</div>
          <h2 className="section-title">Get in Touch</h2>
        </div>

        <div className="contact__wrap">
          <div className="contact__info">
            <p>
              I'm currently open to internship and junior developer roles in
              Sweden. Whether you have a project in mind, a job opportunity, or
              just want to say hello — my inbox is always open.
            </p>
            <div className="social-links">
              <a href={`mailto:${info.email}`} className="social-link">
                <span className="social-link__icon">✉️</span>
                {info.email}
              </a>
              <a href={info.linkedin} target="_blank" rel="noreferrer" className="social-link">
                <span className="social-link__icon">💼</span>
                linkedin.com/in/rehan-iqbal
              </a>
              <a href={info.github} target="_blank" rel="noreferrer" className="social-link">
                <span className="social-link__icon">🐙</span>
                github.com/Rehaniq
              </a>
            </div>
          </div>

          {sent ? (
            <div className="form__success">
              ✅ Message sent! I'll get back to you soon.
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" type="text"
                  placeholder="e.g. Anna Lindström"
                  value={form.name} onChange={handleChange} required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="email"
                  placeholder="your@email.com"
                  value={form.email} onChange={handleChange} required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message" name="message"
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message} onChange={handleChange} required
                />
              </div>
              <button type="submit" className="btn btn--primary">
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}


export function Footer({ name }) {
  return (
    <footer className="footer">
      <p>
        Designed & built by <a href="#">{name}</a> · Uppsala, Sweden · 2026
      </p>
    </footer>
  );
}
