# AI Practitioner Academy

A self-study course that teaches you to find, build, sell and support practical AI for small UK businesses. It produces three things from the same lesson files:

1. **A learning website**: lessons, diagrams, quizzes, flashcards, role-plays, calculators and progress tracking.
2. **A PDF book**, saved in the `output` folder (generated in a later build phase).
3. **Printable toolkit sheets** (generated in a later build phase).

**Live site:** https://sauliussuvaizdis-del.github.io/ai-academy/

## How the live site updates (no computer needed)

Every time new work is pushed to GitHub, a robot (GitHub Actions) builds the site and publishes it. It takes about 2 minutes. You can watch it on the repo's **Actions** tab: a green tick means the site is updated, and a red cross means something failed.

## Where things live

| Folder | What's in it |
|---|---|
| `content/curriculum.json` | The course map: every module and lesson, with its minutes |
| `content/modules/` | One `.mdx` file per lesson (plain text with a few extras, see below) |
| `content/quizzes/` | Quiz questions: `l01-01.json` is lesson 1.1's quiz, `m01.json` is module 1's quiz |
| `content/flashcards/glossary.json` | Glossary terms and flashcards |
| `content/scenarios/` | Role-play conversations |
| `content/exam/final.json` | The final exam |
| `content/toolkit/` | Cheat sheets and templates |
| `src/` | The website's code (you shouldn't need to touch this) |
| `scripts/` | The content checker and PDF builder |
| `output/` | Generated PDFs |

## Editing a lesson

Lessons are text files. You can edit them directly on GitHub: open the file, tap the pencil icon, make your change and tap **Commit changes**. The site rebuilds itself.

- Text between the `---` lines at the top is the lesson's settings: title, minutes, learning objectives, the date facts were last checked, and which quiz it uses.
- `## Heading` starts a section. Every lesson must have these sections, in order: *Why this matters, Core explanation, Worked example, Tools, Hands-on exercise, Common mistakes, Key takeaways.*
- `**bold**`, `*italic*`, `- bullet`, `1. numbered` work as you'd expect.
- Coloured boxes: `<Callout type="tip">…</Callout>`. The types are `tip` 💡, `warning` ⚠️, `trades` 🏗️, `money` 💷 and `changes` 🔄.
- Diagrams: a block starting with three backticks and the word `mermaid` is drawn as a flowchart.

If an edit breaks a rule (a missing section, a quiz without explanations, leftover placeholder text), the build stops, the Actions tab shows a red cross, and the log says exactly what's wrong.

## Commands (only needed on a computer)

You only need these if you ever work on a computer with [Node.js](https://nodejs.org) installed. Open a terminal in this folder and type:

| Command | What it does, in plain English |
|---|---|
| `npm install` | Downloads the building blocks the site needs. Run once, or after the project updates. |
| `npm run dev` | Starts a private preview of the site at http://localhost:5173 that refreshes as you edit. Press Ctrl+C to stop. |
| `npm run check:content` | Checks every lesson, quiz and glossary file against the course rules and lists any problems. |
| `npm run build` | Runs the checks, then produces the finished website in the `dist` folder. |
| `npm run preview` | Shows the finished `dist` website locally, exactly as visitors will see it. |
| `npm run lint` | Checks the code for common programming mistakes. |

## Your progress

Progress (completed lessons, quiz scores, flashcards, checklists) is saved in your phone's browser only. There's no login. Use **My progress → Export progress** to download a backup file, and **Import progress** to restore it, for example on a new phone.
