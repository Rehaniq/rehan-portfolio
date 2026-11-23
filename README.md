# Rehan Iqbal — Portfolio

My personal developer portfolio. I built it to show my projects and experience, and to let employers contact me directly.

## What it includes

- Sections for About, Skills, Experience, Education, Projects and Contact
- Smooth animations made with GSAP
- A skills bar that scrolls continuously from right to left
- A contact form that sends a message to my email
- A responsive layout that works on phones, tablets and desktops

## Built with

- **React** for the page components
- **Vite** to run and build the project
- **GSAP** for animations
- **CSS** for all styling, with no UI library

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173. To build for production, run `npm run build`.

## How it is organised

```
src/
├── data/portfolioData.js   all my content (text, skills, projects)
├── components/             one file per section
└── styles/                 CSS files
```

I keep all the content in one data file, so I can update my details without touching the layout code.

## The contact form

The form sends the visitor's message to my inbox through FormSubmit, a free service, so I don't need my own server. If sending fails, the visitor gets a button to email me directly instead.

## Contact

- Email: thankforjoinme@gmail.com
- LinkedIn: (https://www.linkedin.com/in/rehan-iqbal-390480325/)
- GitHub: (https://github.com/Rehaniq)