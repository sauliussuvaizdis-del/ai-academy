import type Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { lessonSlug } from '../lib/course'

type Entry = { kind: 'lesson' | 'term'; id: string; title: string; text: string }

function snippet(text: string, q: string) {
  const i = text.toLowerCase().indexOf(q.toLowerCase().split(' ')[0])
  const start = Math.max(0, i - 60)
  return (start > 0 ? '…' : '') + text.slice(start, start + 180) + '…'
}

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const [fuse, setFuse] = useState<Fuse<Entry> | null>(null)

  useEffect(() => {
    Promise.all([import('fuse.js'), import('virtual:search')]).then(([F, idx]) => {
      setFuse(new F.default(idx.default, { keys: [{ name: 'title', weight: 3 }, { name: 'text', weight: 1 }], ignoreLocation: true, threshold: 0.3, minMatchCharLength: 3 }))
    })
  }, [])

  const results = useMemo(() => (fuse && q.trim().length > 1 ? fuse.search(q.trim()).slice(0, 30) : []), [fuse, q])

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold text-navy-950 dark:text-white">Search</h1>
      <input
        autoFocus
        className="input mt-4 text-lg"
        placeholder="Search lessons and glossary, e.g. hallucination"
        value={q}
        onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
      />
      {!fuse && <p className="mt-4 text-navy-600">Loading search…</p>}
      {fuse && q.trim().length > 1 && <p className="mt-3 text-sm text-navy-600 dark:text-navy-300">{results.length} result{results.length === 1 ? '' : 's'}</p>}
      <ul className="mt-3 space-y-3">
        {results.map(({ item }) => (
          <li key={item.kind + item.id}>
            <Link to={item.kind === 'lesson' ? `/lesson/${lessonSlug(item.id)}` : `/glossary`} className="card block">
              <span className="text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">{item.kind === 'lesson' ? `Lesson ${item.id}` : 'Glossary'}</span>
              <span className="block font-bold text-navy-950 dark:text-white">{item.title}</span>
              <span className="mt-1 block text-sm text-navy-700 dark:text-navy-200">{snippet(item.text, q)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
