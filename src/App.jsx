import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import {
  Skills,
  Experience,
  Education,
  Projects,
  Contact,
  Footer,
} from "./components/sections.jsx";

import {
  personalInfo,
  stats,
  aboutFacts,
  skills,
  experience,
  education,
  projects,
} from "./data/portfolioData.js";

import "./styles/global.css";
import "./styles/components.css";

export default function App() {
  return (
    <>
      <Navbar name={personalInfo.name} />

      <main>
        <Hero info={personalInfo} stats={stats} />
        <About facts={aboutFacts} />
        <Skills skills={skills} />
        <Experience experience={experience} />
        <Education education={education} />
        <Projects projects={projects} />
        <Contact info={personalInfo} />
      </main>

      <Footer name={personalInfo.name} />
    </>
  );
}
