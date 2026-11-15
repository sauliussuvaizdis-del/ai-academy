// Shape of the course manifest generated at build time (scripts/lib/content.ts).
export interface ManifestLesson {
  id: string
  title: string
  minutes: number
  written: boolean
  path?: string
  objectives: string[]
  readingMinutes: number
  words: number
  quiz?: string
  lastChecked?: string
}

export interface ManifestModule {
  number: number
  slug: string
  title: string
  summary: string
  minutes: number
  quiz?: string
  lessons: ManifestLesson[]
}

export interface Manifest {
  modules: ManifestModule[]
  examMinutes: number
  totalMinutes: number
  writtenMinutes: number
  hasExam: boolean
  scenarios: string[]
  toolkit: { id: string; title: string; path: string }[]
}

