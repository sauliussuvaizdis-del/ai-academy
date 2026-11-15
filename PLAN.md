# AI Practitioner Academy — Phase 0 Plan

Status: **approved**. Phase 1 complete; see the README for how the site is built.

## 1. What gets built

| Deliverable | Where it ends up |
|---|---|
| Interactive learning site | `https://sauliussuvaizdis-del.github.io/ai-academy/` (auto-deployed on every push) |
| PDF book (A4; length follows the content — completeness over page count) | `output/AI-Practitioner-Academy.pdf` in the repo **and** downloadable from the site's `/downloads/` folder |
| Toolkit PDFs (12 one-pagers/templates) | `output/toolkit/*.pdf`, also on the site |

One source of truth: lessons are MDX files in `/content`; the website and the PDF are both built from them.

## 2. Tech stack (as briefed, with the details pinned down)

| Area | Choice | Why |
|---|---|---|
| App | Vite + React 18 + TypeScript (strict) | Fast, fully static output |
| Routing | **Hash routing** (`/#/lesson/1-1`) | Works on GitHub Pages, Hostinger, Netlify with zero server config and no 404s on refresh |
| Styling | Tailwind CSS, light/dark mode, `@tailwindcss/typography` for lesson text | Readable on a phone |
| Content | MDX via `@mdx-js/rollup`, frontmatter via `remark-frontmatter` + `remark-mdx-frontmatter` | One file per lesson |
| Diagrams | Mermaid (loaded only on pages that need it, to keep mobile fast) + hand-built SVG components | Renders in both site and book |
| Quizzes, flashcards, scenarios, exam | JSON in `/content`, validated with Zod schemas shared with the TypeScript types | Catches mistakes at build time |
| Progress | `localStorage` behind a small safe wrapper (every read/write in try/catch) + export/import as a `.json` file | No login needed |
| Search | Fuse.js over lessons + glossary, index built at build time | Instant, offline |
| PDF | `/#/book` print route → **Paged.js** (for running headers with module names, contents page numbers, chapter title pages) → printed to PDF by Playwright (`npm run build:pdf`) | Real book layout from the same content |
| Quality | ESLint, `tsc --noEmit`, `npm run check:content` (fails on missing sections, broken links, empty quizzes, placeholder words) | Enforces the content standard |
| Deploy | GitHub Actions → `gh-pages` branch → GitHub Pages | Phone-only workflow: push, wait ~2 min, refresh |

## 3. Folder structure

```
/.github/workflows/deploy-pages.yml   auto-deploy to GitHub Pages
/content
  /modules/00-orientation/01-how-to-use.mdx … (one folder per module, 15 folders incl. capstone)
  /quizzes/l01-01.json … (lesson quizzes, 5 Qs)   m01.json … (module quizzes, 10–15 Qs)
  /flashcards/glossary.json            (80+ terms)
  /scenarios/roleplay-01.json …        (3+ branching role-plays)
  /exam/final.json                     (60 Qs)
  /toolkit/discovery-cheatsheet.mdx …  (12 appendices)
/src
  /components  LessonLayout, Quiz, Flashcards, Diagram, Callout, ProgressBar, Scenario,
               Checklist, ROICalculator, PriceCalculator, ProcessMapper, OpportunityScorer
  /pages       Home, Module, Lesson, Glossary, Toolkit, Exam, Progress, Book, Search
  /lib         progress store, content loaders, schemas
/scripts       build-pdf.ts, check-content.ts
/output        generated PDFs (committed so you can download them)
README.md      plain-English instructions
```

## 4. Curriculum time check

| Module | Minutes |
|---|---|
| 0 Orientation | 15 |
| 1 AI Fundamentals | 45 |
| 2 Tool Landscape | 45 |
| 3 Prompt Engineering | 50 |
| 4 Automation Foundations | 45 |
| 5 Process Discovery | 50 |
| 6 Use-Case Library | 55 |
| 7 Sector Deep-Dives | 45 |
| 8 Hands-On Builds | 80 |
| 9 Data, Privacy and Risk | 40 |
| 10 ROI and Business Cases | 30 |
| 11 Packaging and Pricing | 30 |
| 12 Sales and Objections | 35 |
| 13 Delivery and Support | 25 |
| 14 Capstone | 40 |
| Final Exam | 20 |
| **Total** | **650** (target 600–700 ✔) |

Roughly 60 lessons. Depth is set by what each lesson needs to cover (all 10 required sections), not by a word or page target; ~300 lesson quiz questions, ~170 module quiz questions.

## 5. Phases

| Phase | Work |
|---|---|
| 0 | This plan + auto-deploy pipeline ✔ |
| 1 | App scaffold, design system, all core components, sample lesson 1.1 + quiz |
| 2 | Modules 0–3 |
| 3 | Modules 4–6 |
| 4 | Modules 7–8 (builds with checklists) |
| 5 | Modules 9–13 + role-play scenarios |
| 6 | Capstone, final exam, glossary/flashcards, toolkit, calculators |
| 7 | PDF book + toolkit PDFs (committed to `/output`) |
| 8 | Final QA, accuracy re-check, README, deploy instructions |

Each phase ends with a push → the site updates automatically → you review on your phone.

## 6. Defaults I'll use unless you say otherwise

1. **Main automation platform for step-by-step builds:** Make (cheaper and more visual for UK small businesses), with Zapier equivalents noted in each build.
2. **AI model in builds:** vendor-neutral steps, showing Claude and ChatGPT/OpenAI options side by side.
3. **Branding:** "AI Practitioner Academy", navy + safety-amber colour scheme (a nod to construction), clean sans-serif type.
4. **Certificate:** you type your name on the certificate page; issued by "AI Practitioner Academy".
5. **Pricing figures:** checked by web search at the time each lesson is written, marked 🔄 with a `lastChecked` date.
6. **Branches:** all work goes on `claude/course-content-setup-kwee4i`; the site deploys from it. Merging to `main` is your call at the end.
