import { Link } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { allLessons, completedMinutes, findLesson, formatMinutes, lessonSlug, manifest, writtenLessons } from '../lib/course'
import { useProgress } from '../lib/progress'

export default function Home() {
  const p = useProgress()
  const doneMin = completedMinutes(p.completed)
  const pct = doneMin / manifest.totalMinutes
  const last = p.last ? findLesson(p.last) : undefined
  const firstUnfinished = writtenLessons.find((l) => !p.completed[l.id])
  const resume = last && !p.completed[last.id] ? last : firstUnfinished ?? last
  const completedCount = allLessons.filter((l) => p.completed[l.id]).length

  return (
    <div className="mx-auto max-w-5xl">
      <section className="overflow-hidden rounded-3xl bg-navy-900 p-6 text-white shadow-lg sm:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-400">AI Practitioner Academy</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">Learn to find, build and sell practical AI for small UK businesses.</h1>
        <p className="mt-3 max-w-2xl text-navy-200">
          {manifest.modules.length} modules, about {formatMinutes(manifest.totalMinutes)} including exercises, quizzes and the final exam. Written for trades,
          construction, property and local services.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-navy-800 p-4">
            <p className="text-sm text-navy-300">Course complete</p>
            <p className="text-3xl font-extrabold">{Math.round(pct * 100)}%</p>
            <div className="mt-2"><ProgressBar value={pct} small /></div>
          </div>
          <div className="rounded-2xl bg-navy-800 p-4">
            <p className="text-sm text-navy-300">Time remaining</p>
            <p className="text-3xl font-extrabold">{formatMinutes(manifest.totalMinutes - doneMin)}</p>
            <p className="mt-1 text-sm text-navy-300">{completedCount} of {allLessons.length} lessons done</p>
          </div>
          {resume ? (
            <Link to={`/lesson/${lessonSlug(resume.id)}`} className="group rounded-2xl bg-amber-500 p-4 text-navy-950 transition hover:bg-amber-400">
              <p className="text-sm font-semibold">{p.last ? 'Continue where you left off' : 'Start here'}</p>
              <p className="mt-1 font-extrabold leading-snug">{resume.id} {resume.title}</p>
              <p className="mt-1 text-sm font-semibold group-hover:underline">Open lesson →</p>
            </Link>
          ) : (
            <div className="rounded-2xl bg-navy-800 p-4"><p className="font-bold">All written lessons complete. 🎉</p></div>
          )}
        </div>
      </section>

      <h2 className="mb-3 mt-10 text-xl font-extrabold text-navy-950 dark:text-white">Course map</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {manifest.modules.map((m) => {
          const done = m.lessons.filter((l) => p.completed[l.id]).length
          const written = m.lessons.filter((l) => l.written).length
          const quiz = m.quiz ? p.quiz[m.quiz] : undefined
          const lessonQuizzes = m.lessons.map((l) => (l.quiz ? p.quiz[l.quiz] : undefined)).filter(Boolean)
          return (
            <Link key={m.number} to={`/module/${m.number}`} className={`card group flex flex-col ${written ? '' : 'opacity-70'}`}>
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-lg font-extrabold text-amber-400 dark:bg-navy-800">{m.number}</span>
                <span className="text-xs text-navy-500 dark:text-navy-400">{formatMinutes(m.minutes)}</span>
              </div>
              <h3 className="mt-3 font-bold leading-snug text-navy-950 group-hover:underline dark:text-white">{m.title}</h3>
              <p className="mt-1 flex-1 text-sm text-navy-600 dark:text-navy-300">{m.summary}</p>
              <div className="mt-3">
                <ProgressBar value={m.lessons.length ? done / m.lessons.length : 0} small />
                <div className="mt-2 flex flex-wrap justify-between gap-1 text-xs text-navy-600 dark:text-navy-300">
                  <span>{done}/{m.lessons.length} lessons</span>
                  {quiz && <span>Module quiz best: {quiz.best}/{quiz.total}</span>}
                  {!quiz && lessonQuizzes.length > 0 && <span>{lessonQuizzes.length} lesson quiz{lessonQuizzes.length > 1 ? 'zes' : ''} taken</span>}
                  {!written && <span className="italic">Not yet written</span>}
                </div>
              </div>
            </Link>
          )
        })}
        <Link to="/exam" className="card group flex flex-col">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-xl">🎓</span>
          <h3 className="mt-3 font-bold text-navy-950 group-hover:underline dark:text-white">Final exam</h3>
          <p className="mt-1 flex-1 text-sm text-navy-600 dark:text-navy-300">60 questions across all modules. Pass mark 75%, with a printable certificate.</p>
          <p className="mt-3 text-xs text-navy-600 dark:text-navy-300">{p.exam ? `Best: ${Math.round((p.exam.score / p.exam.total) * 100)}%` : `${manifest.examMinutes} min`}</p>
        </Link>
      </div>
    </div>
  )
}
