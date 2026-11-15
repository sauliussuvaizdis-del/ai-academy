import type { ComponentType } from 'react'
import rawManifest from 'virtual:course'
import type { Glossary, Quiz, Scenario } from './schemas'
import type { Manifest, ManifestLesson, ManifestModule } from './manifest-types'

export type { ManifestLesson, ManifestModule }
export const manifest = rawManifest as Manifest

type MdxModule = { default: ComponentType<{ components?: Record<string, unknown> }> }

const lessonLoaders = import.meta.glob<MdxModule>('/content/modules/**/*.mdx')
const toolkitLoaders = import.meta.glob<MdxModule>('/content/toolkit/*.mdx')
const quizLoaders = import.meta.glob<Quiz>('/content/quizzes/*.json', { import: 'default' })
const scenarioLoaders = import.meta.glob<Scenario>('/content/scenarios/*.json', { import: 'default' })
const glossaryLoader = import.meta.glob<Glossary>('/content/flashcards/glossary.json', { import: 'default' })
const examLoader = import.meta.glob<Quiz>('/content/exam/final.json', { import: 'default' })

export const allLessons: (ManifestLesson & { module: ManifestModule })[] = manifest.modules.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, module: m })),
)
export const writtenLessons = allLessons.filter((l) => l.written)

export const lessonSlug = (id: string) => id.replace('.', '-')
export const lessonIdFromSlug = (slug: string) => slug.replace('-', '.')

export function findLesson(id: string) {
  return allLessons.find((l) => l.id === id)
}

export function findModule(n: number) {
  return manifest.modules.find((m) => m.number === n)
}

export function neighbours(id: string) {
  const i = writtenLessons.findIndex((l) => l.id === id)
  return { prev: i > 0 ? writtenLessons[i - 1] : undefined, next: i >= 0 ? writtenLessons[i + 1] : undefined }
}

export function loadLesson(path: string) {
  const loader = lessonLoaders[path]
  if (!loader) return Promise.reject(new Error(`Lesson file not found: ${path}`))
  return loader()
}

export function loadToolkit(path: string) {
  const loader = toolkitLoaders[path]
  if (!loader) return Promise.reject(new Error(`Toolkit file not found: ${path}`))
  return loader()
}

export function loadQuiz(id: string): Promise<Quiz> {
  const loader = quizLoaders[`/content/quizzes/${id}.json`]
  if (!loader) return Promise.reject(new Error(`Quiz not found: ${id}`))
  return loader()
}

export function loadScenario(id: string): Promise<Scenario> {
  const loader = scenarioLoaders[`/content/scenarios/${id}.json`]
  if (!loader) return Promise.reject(new Error(`Scenario not found: ${id}`))
  return loader()
}

export function loadGlossary(): Promise<Glossary> {
  const loader = glossaryLoader['/content/flashcards/glossary.json']
  return loader ? loader() : Promise.resolve({ terms: [] })
}

export function loadExam(): Promise<Quiz | null> {
  const loader = examLoader['/content/exam/final.json']
  return loader ? loader() : Promise.resolve(null)
}

/** Minutes of the course the learner has completed (lessons marked complete). */
export function completedMinutes(completed: Record<string, string>) {
  return allLessons.filter((l) => completed[l.id]).reduce((s, l) => s + l.minutes, 0)
}

export function formatMinutes(min: number) {
  const h = Math.floor(min / 60)
  const m = Math.round(min % 60)
  if (!h) return `${m} min`
  return m ? `${h} h ${m} min` : `${h} h`
}
