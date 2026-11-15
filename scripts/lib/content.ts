// Reads the course content folder. Used by the Vite build (to make the course
// manifest and search index) and by `npm run check:content`.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { CurriculumSchema, LessonFrontmatterSchema, type LessonFrontmatter } from '../../src/lib/schemas'
import type { Manifest, ManifestLesson } from '../../src/lib/manifest-types'

export type { Manifest }

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..')
export const CONTENT = path.join(ROOT, 'content')

export interface LessonFile {
  file: string // absolute path
  webPath: string // e.g. /content/modules/01-x/01-y.mdx
  raw: string
  body: string
  data: Record<string, unknown>
  frontmatter: LessonFrontmatter | null
  frontmatterError?: string
}

export function readCurriculum() {
  const raw = JSON.parse(fs.readFileSync(path.join(CONTENT, 'curriculum.json'), 'utf8'))
  return CurriculumSchema.parse(raw)
}

export function listLessonFiles(): LessonFile[] {
  const dir = path.join(CONTENT, 'modules')
  if (!fs.existsSync(dir)) return []
  const out: LessonFile[] = []
  for (const mod of fs.readdirSync(dir).sort()) {
    const modDir = path.join(dir, mod)
    if (!fs.statSync(modDir).isDirectory()) continue
    for (const f of fs.readdirSync(modDir).sort()) {
      if (!f.endsWith('.mdx')) continue
      const file = path.join(modDir, f)
      const raw = fs.readFileSync(file, 'utf8')
      const parsed = matter(raw)
      const fm = { ...parsed.data }
      // gray-matter turns unquoted dates into Date objects
      if (fm.lastChecked instanceof Date) fm.lastChecked = fm.lastChecked.toISOString().slice(0, 10)
      if (typeof fm.lesson === 'number') fm.lesson = String(fm.lesson)
      const result = LessonFrontmatterSchema.safeParse(fm)
      out.push({
        file,
        webPath: '/' + path.relative(ROOT, file).split(path.sep).join('/'),
        raw,
        body: parsed.content,
        data: fm,
        frontmatter: result.success ? result.data : null,
        frontmatterError: result.success ? undefined : result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '),
      })
    }
  }
  return out
}

/** Turns MDX into plain text for word counts and search. */
export function toPlainText(body: string): string {
  return body
    .replace(/```mermaid[\s\S]*?```/g, ' ')
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/```\w*/g, ' '))
    .replace(/^import .*$/gm, ' ')
    .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]+/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function wordCount(text: string) {
  return text ? text.split(/\s+/).length : 0
}

export function readJson<T = unknown>(rel: string): T | null {
  const file = path.join(CONTENT, rel)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf8')) as T
}

export function quizExists(id: string) {
  return fs.existsSync(path.join(CONTENT, 'quizzes', `${id}.json`))
}

export function buildManifest(): Manifest {
  const curriculum = readCurriculum()
  const files = listLessonFiles()
  const byId = new Map(files.filter((f) => f.frontmatter).map((f) => [f.frontmatter!.lesson, f]))
  let totalMinutes = curriculum.examMinutes
  let writtenMinutes = 0
  const modules = curriculum.modules.map((m) => {
    const lessons = m.lessons.map((l): ManifestLesson => {
      const f = byId.get(l.id)
      totalMinutes += l.minutes
      if (!f) return { id: l.id, title: l.title, minutes: l.minutes, written: false, objectives: [], readingMinutes: 0, words: 0 }
      writtenMinutes += f.frontmatter!.minutes
      const words = wordCount(toPlainText(f.body))
      return {
        id: l.id,
        title: f.frontmatter!.title,
        minutes: f.frontmatter!.minutes,
        written: true,
        path: f.webPath,
        objectives: f.frontmatter!.objectives,
        readingMinutes: Math.max(1, Math.round(words / 220)),
        words,
        quiz: f.frontmatter!.quiz,
        lastChecked: f.frontmatter!.lastChecked,
      }
    })
    const modQuiz = `m${String(m.number).padStart(2, '0')}`
    return {
      number: m.number,
      slug: m.slug,
      title: m.title,
      summary: m.summary,
      minutes: m.lessons.reduce((s, l) => s + l.minutes, 0),
      quiz: quizExists(modQuiz) ? modQuiz : undefined,
      lessons,
    }
  })
  const scenarioDir = path.join(CONTENT, 'scenarios')
  const scenarios = fs.existsSync(scenarioDir) ? fs.readdirSync(scenarioDir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')).sort() : []
  const toolkitDir = path.join(CONTENT, 'toolkit')
  const toolkit = fs.existsSync(toolkitDir)
    ? fs.readdirSync(toolkitDir).filter((f) => f.endsWith('.mdx')).sort().map((f) => {
        const p = matter(fs.readFileSync(path.join(toolkitDir, f), 'utf8'))
        return { id: f.replace(/\.mdx$/, ''), title: String(p.data.title ?? f), path: `/content/toolkit/${f}` }
      })
    : []
  return {
    modules,
    examMinutes: curriculum.examMinutes,
    totalMinutes,
    writtenMinutes,
    hasExam: fs.existsSync(path.join(CONTENT, 'exam', 'final.json')),
    scenarios,
    toolkit,
  }
}

export function buildSearchIndex() {
  const files = listLessonFiles().filter((f) => f.frontmatter)
  const lessons = files.map((f) => ({
    kind: 'lesson' as const,
    id: f.frontmatter!.lesson,
    title: f.frontmatter!.title,
    text: toPlainText(f.body),
  }))
  const glossary = readJson<{ terms: { id: string; term: string; definition: string }[] }>('flashcards/glossary.json')
  const terms = (glossary?.terms ?? []).map((t) => ({ kind: 'term' as const, id: t.id, title: t.term, text: t.definition }))
  return [...lessons, ...terms]
}
