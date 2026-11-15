import { Link, useParams } from 'react-router-dom'
import { Quiz } from '../components/Quiz'
import { findModule, formatMinutes, lessonSlug } from '../lib/course'
import { useProgress } from '../lib/progress'
import NotFound from './NotFound'

export default function Module() {
  const { n } = useParams()
  const m = findModule(Number(n))
  const p = useProgress()
  if (!m) return <NotFound />
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">Module {m.number} · {formatMinutes(m.minutes)}</p>
      <h1 className="mt-1 text-3xl font-extrabold text-navy-950 dark:text-white">{m.title}</h1>
      <p className="mt-2 text-navy-700 dark:text-navy-200">{m.summary}</p>
      <ol className="mt-6 space-y-3">
        {m.lessons.map((l) => {
          const done = !!p.completed[l.id]
          const q = l.quiz ? p.quiz[l.quiz] : undefined
          const inner = (
            <>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${done ? 'bg-emerald-500 text-white' : 'bg-navy-100 text-navy-800 dark:bg-navy-800 dark:text-navy-100'}`}>
                {done ? '✔' : l.id}
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-navy-950 dark:text-white">{l.title}</span>
                <span className="text-sm text-navy-600 dark:text-navy-300">
                  {l.minutes} min{q ? ` · quiz best ${q.best}/${q.total}` : ''}{!l.written ? ' · not yet written' : ''}
                </span>
              </span>
            </>
          )
          return (
            <li key={l.id}>
              {l.written ? (
                <Link to={`/lesson/${lessonSlug(l.id)}`} className="card flex items-center gap-3">{inner}</Link>
              ) : (
                <div className="card flex items-center gap-3 opacity-60">{inner}</div>
              )}
            </li>
          )
        })}
      </ol>
      {m.quiz && (
        <div className="mt-10">
          <Quiz id={m.quiz} />
        </div>
      )}
    </div>
  )
}
