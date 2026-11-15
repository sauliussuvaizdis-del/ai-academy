import { useSyncExternalStore } from 'react'
import { readStore, writeStore } from './storage'

export interface QuizResult {
  best: number
  total: number
  attempts: number
  date: string
}

export interface ExamAttempt {
  score: number
  total: number
  passed: boolean
  date: string
  name?: string
}

export interface Progress {
  v: 1
  completed: Record<string, string>
  quiz: Record<string, QuizResult>
  last?: string
  cards: Record<string, 'know' | 'review'>
  checklists: Record<string, Record<string, boolean>>
  exam?: ExamAttempt
  name?: string
}

const KEY = 'aipa-progress-v1'
const empty = (): Progress => ({ v: 1, completed: {}, quiz: {}, cards: {}, checklists: {} })

let state: Progress = normalise(readStore<unknown>(KEY, null))
const listeners = new Set<() => void>()

function normalise(raw: unknown): Progress {
  const base = empty()
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Partial<Progress>
  return {
    ...base,
    ...r,
    v: 1,
    completed: { ...(r.completed ?? {}) },
    quiz: { ...(r.quiz ?? {}) },
    cards: { ...(r.cards ?? {}) },
    checklists: { ...(r.checklists ?? {}) },
  }
}

function set(update: (p: Progress) => Progress) {
  state = update(state)
  writeStore(KEY, state)
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, () => state, () => state)
}

const today = () => new Date().toISOString().slice(0, 10)

export const progress = {
  get: () => state,
  setComplete(lessonId: string, done: boolean) {
    set((p) => {
      const completed = { ...p.completed }
      if (done) completed[lessonId] = today()
      else delete completed[lessonId]
      return { ...p, completed }
    })
  },
  visit(lessonId: string) {
    if (state.last === lessonId) return
    set((p) => ({ ...p, last: lessonId }))
  },
  recordQuiz(quizId: string, score: number, total: number) {
    set((p) => {
      const prev = p.quiz[quizId]
      const best = prev ? Math.max(prev.best, score) : score
      return {
        ...p,
        quiz: { ...p.quiz, [quizId]: { best, total, attempts: (prev?.attempts ?? 0) + 1, date: today() } },
      }
    })
  },
  setCard(termId: string, status: 'know' | 'review' | null) {
    set((p) => {
      const cards = { ...p.cards }
      if (status) cards[termId] = status
      else delete cards[termId]
      return { ...p, cards }
    })
  },
  setCheck(listId: string, stepId: string, done: boolean) {
    set((p) => ({ ...p, checklists: { ...p.checklists, [listId]: { ...(p.checklists[listId] ?? {}), [stepId]: done } } }))
  },
  recordExam(attempt: ExamAttempt) {
    set((p) => {
      const prev = p.exam
      const keep = !prev || attempt.score >= prev.score ? attempt : prev
      return { ...p, exam: keep }
    })
  },
  setName(name: string) {
    set((p) => ({ ...p, name }))
  },
  export(): string {
    return JSON.stringify({ app: 'ai-practitioner-academy', exported: new Date().toISOString(), progress: state }, null, 2)
  },
  import(json: string): { ok: true } | { ok: false; error: string } {
    try {
      const parsed = JSON.parse(json)
      const data = parsed?.progress ?? parsed
      if (!data || typeof data !== 'object' || !('completed' in data)) return { ok: false, error: 'This file does not look like a progress export.' }
      set(() => normalise(data))
      return { ok: true }
    } catch {
      return { ok: false, error: 'The file could not be read. Make sure it is the .json file you exported.' }
    }
  },
  reset() {
    set(() => empty())
  },
}
