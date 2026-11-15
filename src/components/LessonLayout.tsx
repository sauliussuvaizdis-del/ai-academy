import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { formatMinutes, lessonSlug, neighbours, type ManifestLesson, type ManifestModule } from '../lib/course'
import { progress, useProgress } from '../lib/progress'
import { Quiz } from './Quiz'

export function LessonLayout({ lesson, module, children }: { lesson: ManifestLesson; module: ManifestModule; children: ReactNode }) {
  const p = useProgress()
  const done = !!p.completed[lesson.id]
  const { prev, next } = neighbours(lesson.id)
  return (
    <article className="mx-auto max-w-3xl">
      <nav className="mb-2 text-sm text-navy-600 dark:text-navy-300">
        <Link to={`/module/${module.number}`} className="hover:underline">
          Module {module.number}: {module.title}
        </Link>
      </nav>
      <header className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">Lesson {lesson.id}</p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl dark:text-white">{lesson.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <span className="chip">⏱ {formatMinutes(lesson.minutes)} total</span>
          <span className="chip">📖 about {lesson.readingMinutes} min reading</span>
          {lesson.lastChecked && <span className="chip">🔄 Facts checked {new Date(lesson.lastChecked).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
          {done && <span className="chip !bg-emerald-100 !text-emerald-800 dark:!bg-emerald-950 dark:!text-emerald-200">✔ Completed</span>}
        </div>
        <div className="mt-4 rounded-xl border border-navy-100 bg-navy-50 p-4 dark:border-navy-700 dark:bg-navy-900">
          <p className="mb-2 font-bold text-navy-900 dark:text-white">By the end of this lesson you can:</p>
          <ul className="ml-5 list-disc space-y-1 text-navy-800 dark:text-navy-100">
            {lesson.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className="lesson-body prose prose-navy max-w-none prose-headings:scroll-mt-20 prose-headings:text-navy-950 prose-table:text-sm dark:prose-invert dark:prose-headings:text-white">
        {children}
      </div>

      {lesson.quiz && <Quiz id={lesson.quiz} />}

      <div className="my-8 flex flex-col items-center gap-2 rounded-2xl bg-navy-50 p-5 text-center dark:bg-navy-900">
        <button className={done ? 'btn-ghost' : 'btn-amber text-lg'} onClick={() => progress.setComplete(lesson.id, !done)}>
          {done ? '✔ Completed: tap to undo' : 'Mark lesson complete'}
        </button>
        <p className="text-sm text-navy-600 dark:text-navy-300">Progress is saved on this device. Back it up from the Progress page.</p>
      </div>

      <nav className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        {prev ? (
          <Link to={`/lesson/${lessonSlug(prev.id)}`} className="nav-card">
            <span className="text-xs text-navy-500 dark:text-navy-400">← Previous</span>
            <span className="font-semibold">{prev.id} {prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/lesson/${lessonSlug(next.id)}`} className="nav-card sm:text-right">
            <span className="text-xs text-navy-500 dark:text-navy-400">Next →</span>
            <span className="font-semibold">{next.id} {next.title}</span>
          </Link>
        ) : (
          <Link to={`/module/${module.number}`} className="nav-card sm:text-right">
            <span className="text-xs text-navy-500 dark:text-navy-400">Back to</span>
            <span className="font-semibold">Module {module.number} overview</span>
          </Link>
        )}
      </nav>
    </article>
  )
}
