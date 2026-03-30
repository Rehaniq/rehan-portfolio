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
            A developer with a story<br />worth telling
          </h2>
        </div>

        <div className="about__grid">
          <div className="about__text fade-up" ref={textRef}>
            <p>
              I'm Rehan Iqbal, a software engineer who graduated from the
              University of Faisalabad in 2024. My journey into web development
              began professionally as a WordPress developer, where I gained
              real-world experience building and maintaining websites for clients.
            </p>
            <blockquote className="about__highlight">
              "WordPress was my starting point — full-stack development is where I'm headed."
            </blockquote>
            <p>
              After completing Angela Yu's acclaimed Full Stack Development course
              on Udemy, I deepened my skills in React, Node.js, and modern web
              technologies. In September 2025, I relocated to Uppsala, Sweden —
              a new chapter that has only strengthened my drive to build a
              meaningful career in tech.
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
