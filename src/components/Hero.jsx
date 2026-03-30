import "../styles/Hero.css";

export default function Hero({ info, stats }) {
  return (
    <section className="hero" id="home">
      <div className="hero__text">
        <div className="hero__eyebrow">
          {info.available ? "Available for opportunities" : "Currently unavailable"}
        </div>

        <h1 className="hero__title">
          Full Stack <em>Developer</em><br />based in Sweden
        </h1>

        <p className="hero__bio">{info.bio}</p>

        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>
            View Projects →
          </a>
          <a href="#contact" className="btn btn--outline"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Get in Touch
          </a>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero-card">
          <div className="hero-card__avatar">RI</div>
          <h3>{info.name}</h3>
          <p>{info.title} · {info.location}</p>

          <div className="hero-card__stats">
            {stats.map(({ num, label }) => (
              <div className="stat" key={label}>
                <span className="stat__num">{num}</span>
                <span className="stat__label">{label}</span>
              </div>
            ))}
          </div>

          {info.available && (
            <div className="status-badge">Open to Work</div>
          )}
        </div>
      </div>
    </section>
  );
}
