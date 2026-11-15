import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flashcards } from '../components/Flashcards'
import { lessonSlug, loadGlossary } from '../lib/course'
import type { Glossary as G } from '../lib/schemas'

export default function Glossary() {
  const [data, setData] = useState<G | null>(null)
  const [mode, setMode] = useState<'cards' | 'list'>('cards')
  const [q, setQ] = useState('')
  useEffect(() => {
    loadGlossary().then(setData)
  }, [])
  const terms = useMemo(() => [...(data?.terms ?? [])].sort((a, b) => a.term.localeCompare(b.term)), [data])
  const filtered = terms.filter((t) => !q || (t.term + ' ' + t.definition).toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold text-navy-950 dark:text-white">Glossary & flashcards</h1>
      <p className="mt-2 text-navy-700 dark:text-navy-200">
        {terms.length} terms so far, explained in plain English. Use the flashcards to test yourself: sort each card into “know it” or “review again”.
      </p>
      <div className="my-4 inline-flex rounded-xl bg-navy-100 p-1 dark:bg-navy-800">
        {(['cards', 'list'] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${mode === m ? 'bg-white text-navy-900 shadow dark:bg-navy-950 dark:text-white' : 'text-navy-700 dark:text-navy-200'}`}>
            {m === 'cards' ? '🃏 Flashcards' : '📖 A–Z list'}
          </button>
        ))}
      </div>
      {!data ? (
        <div className="h-60 animate-pulse rounded-2xl bg-navy-100 dark:bg-navy-800" />
      ) : mode === 'cards' ? (
        <Flashcards terms={terms} />
      ) : (
        <>
          <input className="input mb-4" placeholder="Filter terms…" value={q} onChange={(e) => setQ(e.target.value)} />
          <dl className="space-y-3">
            {filtered.map((t) => (
              <div key={t.id} id={t.id} className="card">
                <dt className="font-bold text-navy-950 dark:text-white">{t.term}</dt>
                <dd className="mt-1 text-navy-800 dark:text-navy-100">{t.definition}</dd>
                {t.example && <dd className="mt-1 text-sm italic text-navy-600 dark:text-navy-300">e.g. {t.example}</dd>}
                {t.lesson && (
                  <dd className="mt-1 text-sm">
                    <Link className="text-navy-600 underline dark:text-amber-300" to={`/lesson/${lessonSlug(t.lesson)}`}>Explained in lesson {t.lesson}</Link>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </>
      )}
    </div>
  )
}
