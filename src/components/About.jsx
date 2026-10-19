import { useScrollReveal } from "../hooks/index.js";
import "../styles/components.css";

function FactItem({ icon, title, desc }) {
  const ref = useScrollReveal();
  return (
    <div className="fact-item fade-up" ref={ref}>
      <div className="fact-item__icon">{icon}</div>
      <div>
        <div className="fact-item__title">{title}</div>
        <div className="fact-item__desc">{desc}</div>
      </div>
    </div>
  );
}

export default function About({ facts }) {
  const textRef = useScrollReveal();

  return (
    <section className="section section--alt" id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Who I Am</div>
          <h2 className="section-title">
            Learning, building, and getting<br />better every day
          </h2>
        </div>

        <div className="about__grid">
          <div className="about__text fade-up" ref={textRef}>
            <p>
              I'm Rehan Iqbal, a Junior Full Stack Developer based in Uppsala, Sweden.
              I have a BSc in Software Engineering from the University of Faisalabad
              and work at Weaverex, where I build and maintain web applications with
              React, JavaScript, HTML, and CSS.
            </p>
            <p>
              I started with WordPress and frontend work, then moved into full stack
              development with Node.js, Express, and PostgreSQL. I'm also learning Swedish and
              looking for a junior full stack or frontend role.
            </p>
          </div>

          <div className="about__facts">
            {facts.map((fact) => (
              <FactItem key={fact.title} {...fact} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
