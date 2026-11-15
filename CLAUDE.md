# AI Practitioner Academy — Build Brief for Claude Code

> **How to use this file:** Put this file, named `CLAUDE.md`, into an empty folder. Open Claude Code in that folder and paste the **Kickoff Prompt** below. Claude Code reads this file automatically in every session, so the brief stays in force for the whole build.

---

## KICKOFF PROMPT (paste this into Claude Code)

```
Read CLAUDE.md fully. It is the complete brief for this project.
Start with Phase 0: confirm the plan, the tech stack and the folder structure, and list any questions.
Then work through the phases in order. Stop at the end of each phase so I can review it, and only continue when I say "next".
Write ALL the course content in full depth as specified. Never use placeholders, "lorem ipsum" or "content to be added".
```

---

## 1. Project overview

**Who it's for:** Saulius, a London-based construction and development project manager with 15+ years of UK residential experience (refurbishment, basements, extensions, new-build, multi-unit conversions). He is tech-comfortable but not a programmer. His degree is in Information Management Systems.

**Business goal:** To launch an AI integration consultancy for small UK businesses (1–50 staff). It starts with trades, construction, property and local services, then expands to other sectors. A related offer is a low-cost website refresh for small traders, which can be upsold into AI services.

**Learning goal:** After about 10 hours, the learner can:
1. Explain AI clearly to non-technical business owners, without hype
2. Run a discovery meeting and map a business's processes
3. Spot "AI-shaped" problems and rank them by ROI and difficulty
4. Design and build working solutions using no-code/low-code tools
5. Handle data protection (UK GDPR) and risk responsibly
6. Price, propose, sell, deliver and support AI projects

**Deliverables:**
1. **An interactive learning platform**: a static website with lessons, visuals, quizzes, flashcards, progress tracking, role-play scenarios and a final exam.
2. **A PDF book**: the same content, typeset as a professional book of about 250–300 pages, generated from the same source files.
3. **A printable toolkit**: cheat sheets and templates as separate one-page PDFs.

One content source, two outputs. Content is written once in Markdown/MDX, and both the site and the PDF are built from it.

---

## 2. Tech stack (keep it simple and maintainable)

- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS. Clean, professional and readable, with light and dark mode.
- **Content:** MDX files in `/content`, one file per lesson, with frontmatter
- **Diagrams:** Mermaid (rendered in both the site and the PDF), plus hand-built SVG for key concept graphics
- **Quizzes/flashcards/exam:** JSON files validated against a TypeScript schema
- **Progress:** `localStorage` (wrap every read/write in try/catch). Include an export/import progress button.
- **Search:** client-side search (e.g. Fuse.js) across lessons and the glossary
- **PDF:** a `/book` print route with print CSS, rendered to PDF with Playwright via `npm run build:pdf`
- **Hosting:** fully static output in `/dist`, deployable to any static host (Hostinger, Netlify, etc.). No backend and no login.
- **Quality:** ESLint, TypeScript strict mode, a content validation script (`npm run check:content`) that fails on missing sections, broken links, empty quizzes or placeholder text

Explain every command in the README in plain English, because the owner is not a developer.

### Folder structure
```
/content
  /modules/00-orientation/01-how-to-use.mdx ...
  /quizzes/m01.json ...
  /flashcards/glossary.json
  /scenarios/roleplay-01.json ...
  /exam/final.json
  /toolkit/discovery-cheatsheet.mdx ...
/src
  /components (LessonLayout, Quiz, Flashcards, Diagram, Callout, ProgressBar, Scenario, Checklist, ROICalculator, PriceCalculator)
  /pages (Home, Module, Lesson, Glossary, Toolkit, Exam, Progress, Book)
/scripts (build-pdf.ts, check-content.ts)
README.md
```

---

## 3. Platform features

1. **Dashboard:** course map, overall % complete, time remaining, "continue where you left off", quiz scores per module
2. **Lesson page:** objectives, reading time, content, diagrams, call-out boxes, exercise, a "mark complete" button and next/previous links
3. **Call-out boxes:** 💡 Tip, ⚠️ Warning, 🏗️ Trades Example, 💷 Money, 🔄 Changes Fast (check before quoting to clients)
4. **Quizzes:** after each lesson (5 questions) and module (10–15 questions). Multiple choice, multi-select and scenario-based questions, with instant feedback and an explanation for every option. Retry allowed; best score saved.
5. **Flashcards:** a glossary of 80+ terms, flip cards, "know it / review again" sorting
6. **Role-play scenarios:** branching conversations with simulated business owners (choose a reply, see the owner's reaction, get coached feedback at the end). There should also be a "Practise with Claude" button that copies a ready-made role-play prompt for live practice in Claude.
7. **Interactive tools:**
   - **ROI calculator** (hours saved × hourly cost × weeks, minus tool and build costs; shows payback period)
   - **Pricing calculator** (build hours, day rate, tool costs, margin, retainer)
   - **Process-mapping worksheet** (fill in workflow steps; flags AI-suitable steps using the module 5 criteria)
   - **Opportunity scorer** (impact × ease matrix, drawn as a 2×2 chart)
8. **Build checklists:** tick-box steps for each hands-on project
9. **Final exam:** 60 questions, timed (optional), 75% pass mark, a printable certificate page with name and date
10. **Toolkit page:** download links for all cheat sheets and templates
11. **Mobile-friendly:** the owner often uses his phone. Lessons must read well on a narrow screen.

---

## 4. Content standards (apply to EVERY lesson)

Each lesson MDX file must contain, in this order:
1. **Frontmatter:** `title`, `module`, `lesson`, `minutes`, `objectives[]`, `lastChecked` (date)
2. **Why this matters:** 2–3 sentences tied to winning or delivering client work
3. **Core explanation:** in depth and plain English, with analogies (construction analogies are welcome, e.g. "an automation is like a sequence on a programme of works")
4. **At least one diagram** (Mermaid or SVG)
5. **A worked UK small-business example**, with realistic names (fictional businesses only), numbers and outcome
6. **Tools:** real current tool names, what each does, and an approximate UK cost, marked 🔄 Changes Fast
7. **Hands-on exercise:** something the learner actually does (10–20 min), with an expected result
8. **Common mistakes:** 3–5 of them
9. **Key takeaways:** 3–5 bullets
10. **Quiz:** linked JSON, 5 questions with explanations

**Writing style:** written for a practical business person. Specific, no hype, no jargon without explanation, and UK spelling and currency (£). Don't pad, but don't summarise either: aim for the depth the minutes allow (roughly 150–200 words of reading per minute, plus exercise time).

**Accuracy rules:**
- Use web search to check current tool names, features, pricing and UK regulations (ICO guidance on UK GDPR, the Data (Use and Access) Act 2025, etc.) before writing those sections. Record the date checked in `lastChecked`.
- Never invent statistics. If a figure is illustrative, label it "illustrative example".
- Use fictional company names in all case studies. Never impersonate real businesses.
- Be honest about AI's limits: hallucinations, the need for human review, and when NOT to use AI.

---

## 5. Curriculum (about 10.5 hours in total)

Times include reading, exercises and quizzes. Claude Code may refine lesson titles, but must keep the scope and the total time.

### Module 0 — Orientation (15 min)
- 0.1 How to use this course and the platform (5)
- 0.2 The opportunity: why small UK businesses need AI help now, and where you fit (10)

### Module 1 — AI Fundamentals (45 min)
- 1.1 What AI, machine learning and LLMs actually are, in plain English (10)
- 1.2 How LLMs work: tokens, context windows, training vs. your data (10)
- 1.3 What AI is good at, bad at, and dangerous at, including hallucinations (10)
- 1.4 Types of AI capability: text, vision, voice, documents, agents, image/video (10)
- 1.5 Jargon buster: explaining AI to a sceptical builder in 60 seconds (5)

### Module 2 — The AI Tool Landscape (45 min)
- 2.1 AI assistants: Claude, ChatGPT, Gemini, Microsoft Copilot. Strengths, business plans, data settings (12)
- 2.2 AI inside existing software: Microsoft 365, Google Workspace, Xero/QuickBooks, CRMs (8)
- 2.3 Automation platforms at a glance: Zapier, Make, n8n, Power Automate (8)
- 2.4 Chatbots, voice/phone AI, AI receptionists, meeting note-takers (9)
- 2.5 Document AI, image/video tools, and choosing the right tool (decision tree diagram) (8)

### Module 3 — Prompt Engineering for Business (50 min)
- 3.1 Anatomy of a great prompt: role, context, task, format, examples (12)
- 3.2 Reusable assistants: system prompts, Claude Projects, custom GPTs, knowledge files (12)
- 3.3 Prompt patterns for business: drafting, summarising, extracting, classifying, checking (13)
- 3.4 Building a client prompt library: templates for quotes, emails, method statements, social posts (13)

### Module 4 — Automation Foundations (45 min)
- 4.1 Triggers, actions, data and APIs, explained simply (10)
- 4.2 Your first Zapier/Make automation, step by step (15)
- 4.3 Adding AI steps into automations (summarise, classify, draft) (10)
- 4.4 Reliability: error handling, human approval steps, logging, cost control (10)

### Module 5 — Process Discovery (50 min)
- 5.1 Running a discovery meeting: structure, 40 key questions, listening for pain (15)
- 5.2 Mapping workflows: swimlane diagrams, time-per-task, handoffs (12)
- 5.3 Spotting AI-shaped problems: repetitive, text-heavy, rule-based, high-volume, delay-sensitive (10)
- 5.4 Prioritising: impact vs. ease matrix, quick wins vs. big bets (8)
- 5.5 Writing the discovery report the client actually reads (5)

### Module 6 — Use-Case Library by Business Function (55 min)
For each use case: the problem, the AI solution, tools, build difficulty (1–5), typical time saved, and risks.
- 6.1 Lead capture and enquiry handling (instant replies, qualification, missed-call text-back) (10)
- 6.2 Quoting, estimating and proposals (site notes to draft quote, scope writing) (10)
- 6.3 Scheduling, job management and customer updates (8)
- 6.4 Email and admin: triage, drafting, summarising, filing (8)
- 6.5 Finance admin: invoice chasing, receipt capture, bookkeeping assistance (7)
- 6.6 Marketing: reviews, social posts, website content, local SEO (7)
- 6.7 HR and compliance: recruitment ads, onboarding, H&S documents, RAMS drafting (5)

### Module 7 — Sector Deep-Dives (45 min)
Each covers typical workflows, top 5 AI opportunities, objections, and a sample package.
- 7.1 Builders, contractors and trades (electricians, plumbers, roofers) (12)
- 7.2 Estate and letting agents, property managers (8)
- 7.3 Accountants, bookkeepers and professional services (7)
- 7.4 Salons, clinics and appointment-based businesses (6)
- 7.5 Restaurants, cafés and hospitality (6)
- 7.6 Local retail and e-commerce (6)

### Module 8 — Hands-On Builds (80 min)
Each build includes a diagram, a step-by-step checklist, a test plan, cost estimate and a client handover note.
- 8.1 AI enquiry auto-responder (web form → AI draft → approval → reply) (10)
- 8.2 Quote drafting assistant from site notes or voice memos (10)
- 8.3 Automated follow-ups and review requests (8)
- 8.4 Internal knowledge chatbot (company documents, price lists, procedures) (10)
- 8.5 Email triage and summary digest (8)
- 8.6 AI phone answering / missed-call handling (8)
- 8.7 Document extraction (invoices, delivery notes into a spreadsheet) (8)
- 8.8 Weekly business report generator (8)
- 8.9 Social media content engine with approval workflow (5)
- 8.10 Bundling builds into a website + AI package (5)

### Module 9 — Data, Privacy and Risk (40 min)
- 9.1 UK GDPR essentials for AI projects: lawful basis, data minimisation, ICO guidance (12)
- 9.2 Processor vs. controller, data processing agreements, where data is stored (8)
- 9.3 Security basics: accounts, permissions, API keys, client access (8)
- 9.4 Accuracy, human oversight and liability, with contract clauses and disclaimers (8)
- 9.5 When to say no: high-risk uses and red flags (4)

### Module 10 — ROI and Business Cases (30 min)
- 10.1 Measuring the baseline: time, cost, errors, missed revenue (10)
- 10.2 Calculating ROI and payback (uses the ROI calculator) (10)
- 10.3 Presenting the business case to a sceptical owner (10)

### Module 11 — Packaging and Pricing (30 min)
- 11.1 Offer ladder: free audit, paid audit, fixed-price builds, retainers, training (10)
- 11.2 UK pricing benchmarks and how to price on value vs. time (🔄 check current market) (10)
- 11.3 Proposals and scopes of work that prevent scope creep (10)

### Module 12 — Sales and Objection Handling (35 min)
- 12.1 Finding clients: local networks, trades, cold email, the website-refresh upsell, planning-application leads (10)
- 12.2 The first conversation: explaining AI simply, demo-first selling (8)
- 12.3 The top 12 objections, with responses ("too expensive", "we don't trust it", "we tried ChatGPT", "we're too small"...) (10)
- 12.4 Role-play scenarios (3 branching scenarios) (7)

### Module 13 — Delivery and Support (25 min)
- 13.1 Project delivery process: kickoff, build, test, handover (8)
- 13.2 Training client staff and driving adoption (7)
- 13.3 Maintenance, monitoring and retainers (5)
- 13.4 Scaling: templates, reusable builds, subcontractors (5)

### Module 14 — Capstone Project (40 min)
A full mock engagement with a fictional London building firm, "Hartwell & Sons Builders" (12 staff): discovery transcript, process map, opportunity scoring, ROI case, proposal, build plan and handover. The learner completes each step using worksheets, then compares their work with a model answer.

### Final Exam (20 min)
60 questions across all modules, 75% to pass, plus a certificate.

**Total: about 650 minutes (about 10.8 hours)**

---

## 6. Appendices and toolkit (also downloadable PDFs)

1. Discovery meeting cheat sheet (1 page)
2. 40 discovery questions by business function
3. AI opportunity scoring worksheet
4. ROI calculation template
5. Proposal / scope of work template
6. Data processing and AI use checklist (UK GDPR)
7. Client handover template
8. Prompt library (50+ business prompts, grouped by use case)
9. Glossary (80+ terms)
10. Tool directory (name, category, what it's for, approximate UK cost, last checked)
11. 30-day launch action plan
12. Objection-handling quick card

---

## 7. PDF book specification

- A4, professional layout: cover page, title page, contents with page numbers, chapter title pages for each module
- Running headers (module name) and page numbers in footers
- Diagrams rendered as vector graphics; call-out boxes styled in colour
- Quizzes at the end of each chapter, with an answer key in an appendix
- Appendices and glossary at the back, followed by an index if feasible
- Output: `/output/AI-Practitioner-Academy.pdf`, plus individual toolkit PDFs in `/output/toolkit/`
- Check: open the PDF, review several pages visually (screenshots), and fix overflow, broken diagrams and page breaks inside tables or call-outs

---

## 8. Build phases (stop for review after each)

| Phase | Work | Review point |
|---|---|---|
| 0 | Confirm the plan, stack and structure; ask questions | Owner approves the plan |
| 1 | Scaffold the app, components, design system, one fully written sample lesson (1.1) with quiz | Owner reviews look, feel and depth |
| 2 | Modules 0–3 content + quizzes | Review |
| 3 | Modules 4–6 | Review |
| 4 | Modules 7–8 (builds with checklists) | Review |
| 5 | Modules 9–13 + role-play scenarios | Review |
| 6 | Capstone, final exam, glossary, flashcards, toolkit, calculators | Review |
| 7 | PDF book + toolkit PDFs | Review the PDF |
| 8 | Final QA: content check script, links, mobile test, accuracy re-check, README, deploy instructions | Sign-off |

At each phase end, report: what was built, total minutes written so far against the 650 target, anything needing a decision, and how to preview it (`npm run dev`).

---

## 9. Definition of done

- [ ] All 14 modules plus capstone fully written; no placeholders (`npm run check:content` passes)
- [ ] Every lesson has a diagram, example, exercise and quiz
- [ ] Total estimated time is between 600 and 700 minutes
- [ ] 80+ glossary flashcards, 3+ role-play scenarios, a 60-question exam
- [ ] ROI and pricing calculators work and are tested with sample numbers
- [ ] Progress saves and restores; export/import works
- [ ] The site works well on mobile and desktop
- [ ] PDF book generated and visually checked; toolkit PDFs generated
- [ ] README explains in plain English how to run it, edit content, rebuild the PDF and deploy
- [ ] Tool and pricing sections marked with `lastChecked` dates
