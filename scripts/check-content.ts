// npm run check:content           checks everything written so far
// npm run check:content -- --strict  also fails if any planned lesson, quiz,
//                                   glossary term, scenario or exam is missing
import fs from 'node:fs'
import path from 'node:path'
import { CONTENT, listLessonFiles, readCurriculum, readJson, toPlainText, wordCount, buildManifest } from './lib/content'
import { GlossarySchema, QuizSchema, ScenarioSchema } from '../src/lib/schemas'

const strict = process.argv.includes('--strict')
const errors: string[] = []
const warnings: string[] = []
const err = (where: string, msg: string) => errors.push(`✘ ${where}: ${msg}`)
const warn = (where: string, msg: string) => warnings.push(`! ${where}: ${msg}`)

const REQUIRED_SECTIONS = ['Why this matters', 'Core explanation', 'Worked example', 'Tools', 'Hands-on exercise', 'Common mistakes', 'Key takeaways']
const PLACEHOLDER = /lorem ipsum|\bTODO\b|\bTBD\b|content to be added|coming soon|placeholder|\[insert|\bxxx\b|to be written/i
const STATIC_ROUTES = new Set(['/', '/glossary', '/tools', '/toolkit', '/exam', '/progress', '/search'])

const curriculum = readCurriculum()
const planned = new Map(curriculum.modules.flatMap((m) => m.lessons.map((l) => [l.id, { ...l, module: m.number }])))
const files = listLessonFiles()
const writtenIds = new Set(files.map((f) => f.frontmatter?.lesson).filter(Boolean) as string[])

function validateQuiz(id: string, where: string, kind: 'lesson' | 'module' | 'exam', min: number, max: number) {
  const raw = readJson(kind === 'exam' ? 'exam/final.json' : `quizzes/${id}.json`)
  if (!raw) return err(where, `quiz file ${id}.json not found`)
  const r = QuizSchema.safeParse(raw)
  if (!r.success) return err(where, `quiz ${id} invalid: ${r.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`)
  const q = r.data
  if (q.id !== id) err(where, `quiz id "${q.id}" does not match file name "${id}"`)
  if (q.kind !== kind) err(where, `quiz ${id} should have kind "${kind}"`)
  if (q.questions.length < min || q.questions.length > max) err(where, `quiz ${id} has ${q.questions.length} questions (needs ${min}–${max})`)
  const ids = new Set<string>()
  for (const question of q.questions) {
    if (ids.has(question.id)) err(where, `quiz ${id} repeats question id ${question.id}`)
    ids.add(question.id)
    if (PLACEHOLDER.test(JSON.stringify(question))) err(where, `quiz ${id} question ${question.id} contains placeholder text`)
  }
}

for (const f of files) {
  const where = path.relative(CONTENT, f.file)
  if (!f.frontmatter) {
    err(where, `frontmatter invalid: ${f.frontmatterError}`)
    continue
  }
  const fm = f.frontmatter
  const plan = planned.get(fm.lesson)
  if (!plan) err(where, `lesson ${fm.lesson} is not in curriculum.json`)
  else {
    if (plan.module !== fm.module) err(where, `module ${fm.module} does not match curriculum (${plan.module})`)
    if (plan.minutes !== fm.minutes) warn(where, `minutes ${fm.minutes} differ from curriculum (${plan.minutes})`)
  }

  // Sections present and in order
  const headings = [...f.body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim())
  let last = -1
  for (const s of REQUIRED_SECTIONS) {
    const idx = headings.findIndex((h) => h.toLowerCase().startsWith(s.toLowerCase()))
    if (idx === -1) err(where, `missing section "## ${s}"`)
    else if (idx < last) err(where, `section "## ${s}" is out of order`)
    else last = idx
  }
  const section = (name: string) => {
    const m = f.body.match(new RegExp(`^##\\s+${name}[^\\n]*\\n([\\s\\S]*?)(?=^##\\s|$(?![\\s\\S]))`, 'mi'))
    return m ? m[1] : ''
  }

  if (!/```mermaid|<\w*Figure\b|<Diagram\b|<svg\b/.test(f.body)) err(where, 'needs at least one diagram (mermaid block or SVG figure)')
  if (!/<Exercise\b/.test(f.body)) err(where, 'hands-on exercise should use the <Exercise> component')
  if (!/expected result/i.test(section('Hands-on exercise'))) err(where, 'exercise needs an "Expected result"')
  if (!/🔄/.test(section('Tools')) && !/type="changes"/.test(section('Tools'))) err(where, 'Tools section must flag prices/tools with 🔄')
  if (!/£/.test(f.body)) warn(where, 'no £ figures found: check UK currency is used')
  if (/\$\d/.test(toPlainText(f.body))) warn(where, 'contains $ amounts: use £ unless quoting a US price deliberately')

  const mistakes = (section('Common mistakes').match(/^\s*(\d+\.|[-*])\s+/gm) ?? []).length
  if (mistakes < 3 || mistakes > 5) err(where, `Common mistakes should list 3–5 items (found ${mistakes})`)
  const takeaways = (section('Key takeaways').match(/^\s*[-*]\s+/gm) ?? []).length
  if (takeaways < 3 || takeaways > 5) err(where, `Key takeaways should have 3–5 bullets (found ${takeaways})`)

  const plain = toPlainText(f.body)
  const m = PLACEHOLDER.exec(f.body)
  if (m) err(where, `placeholder text found: "${m[0]}"`)
  const words = wordCount(plain)
  const minWords = Math.round(fm.minutes * 80)
  if (words < minWords) err(where, `only ${words} words for a ${fm.minutes}-minute lesson (expect at least ${minWords})`)

  // Internal links
  for (const link of f.body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const href = link[1].split('#')[0]
    const lessonMatch = href.match(/^\/lesson\/(\d+)-(\d+)$/)
    const moduleMatch = href.match(/^\/module\/(\d+)$/)
    if (lessonMatch) {
      const id = `${lessonMatch[1]}.${lessonMatch[2]}`
      if (!planned.has(id)) err(where, `link to unknown lesson ${href}`)
      else if (!writtenIds.has(id)) warn(where, `link to lesson ${id}, which is not written yet`)
    } else if (moduleMatch) {
      if (!curriculum.modules.some((mm) => mm.number === Number(moduleMatch[1]))) err(where, `link to unknown module ${href}`)
    } else if (!STATIC_ROUTES.has(href)) err(where, `broken internal link ${href}`)
  }

  if (!fm.quiz) err(where, 'frontmatter needs a quiz id')
  else validateQuiz(fm.quiz, where, 'lesson', 5, 5)
}

// Module quizzes
for (const m of curriculum.modules) {
  const id = `m${String(m.number).padStart(2, '0')}`
  const file = path.join(CONTENT, 'quizzes', `${id}.json`)
  const anyWritten = m.lessons.some((l) => writtenIds.has(l.id))
  if (fs.existsSync(file)) validateQuiz(id, `quizzes/${id}.json`, 'module', 10, 15)
  else if (strict || (anyWritten && m.lessons.every((l) => writtenIds.has(l.id)) && m.number !== 14)) {
    err(`module ${m.number}`, `module quiz ${id}.json is missing`)
  }
}

// Glossary
const glossary = readJson('flashcards/glossary.json')
if (glossary) {
  const r = GlossarySchema.safeParse(glossary)
  if (!r.success) err('flashcards/glossary.json', r.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; '))
  else {
    const seen = new Set<string>()
    for (const t of r.data.terms) {
      if (seen.has(t.id)) err('glossary', `duplicate term id ${t.id}`)
      seen.add(t.id)
      if (t.lesson && !planned.has(t.lesson)) err('glossary', `${t.id} points to unknown lesson ${t.lesson}`)
    }
    if (strict && r.data.terms.length < 80) err('glossary', `${r.data.terms.length} terms (needs 80+)`)
  }
} else if (strict) err('glossary', 'flashcards/glossary.json missing')

// Scenarios
const scenarioDir = path.join(CONTENT, 'scenarios')
const scenarioFiles = fs.existsSync(scenarioDir) ? fs.readdirSync(scenarioDir).filter((f) => f.endsWith('.json')) : []
for (const sf of scenarioFiles) {
  const r = ScenarioSchema.safeParse(readJson(`scenarios/${sf}`))
  if (!r.success) {
    err(`scenarios/${sf}`, r.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; '))
    continue
  }
  const s = r.data
  if (!s.nodes[s.start]) err(`scenarios/${sf}`, `start node "${s.start}" missing`)
  for (const [nid, n] of Object.entries(s.nodes)) {
    for (const c of n.choices ?? []) if (!s.nodes[c.next]) err(`scenarios/${sf}`, `node ${nid} links to missing node ${c.next}`)
    if (!n.end && !n.choices?.length) err(`scenarios/${sf}`, `node ${nid} has no choices and is not an end`)
  }
}
if (strict && scenarioFiles.length < 3) err('scenarios', `${scenarioFiles.length} scenarios (needs 3+)`)

// Exam
if (fs.existsSync(path.join(CONTENT, 'exam', 'final.json'))) validateQuiz('final', 'exam/final.json', 'exam', 60, 60)
else if (strict) err('exam', 'exam/final.json missing')

// Planned lessons
const missing = [...planned.keys()].filter((id) => !writtenIds.has(id))
if (strict && missing.length) err('curriculum', `${missing.length} lessons not written: ${missing.join(', ')}`)

// Summary
const manifest = buildManifest()
const totalWords = files.reduce((s, f) => s + wordCount(toPlainText(f.body)), 0)
console.log('AI Practitioner Academy: content check')
console.log(`  Lessons written:   ${writtenIds.size} of ${planned.size}`)
console.log(`  Minutes written:   ${manifest.writtenMinutes} of ${manifest.totalMinutes - manifest.examMinutes} lesson minutes (course total ${manifest.totalMinutes} incl. exam; target 600–700)`)
console.log(`  Words of lessons:  ${totalWords.toLocaleString('en-GB')}`)
console.log(`  Glossary terms:    ${(glossary as { terms?: unknown[] } | null)?.terms?.length ?? 0}`)
console.log(`  Scenarios:         ${scenarioFiles.length}`)
if (manifest.totalMinutes < 600 || manifest.totalMinutes > 700) err('curriculum', `total ${manifest.totalMinutes} min is outside 600–700`)
if (warnings.length) console.log('\nWarnings:\n  ' + warnings.join('\n  '))
if (errors.length) {
  console.error('\nProblems that must be fixed:\n  ' + errors.join('\n  '))
  process.exit(1)
}
console.log(`\n✔ Content check passed${strict ? ' (strict)' : ''}.`)
