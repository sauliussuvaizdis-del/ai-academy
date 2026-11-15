import { useMemo, useState } from 'react'
import { progress, useProgress } from '../lib/progress'
import type { Glossary } from '../lib/schemas'

type Term = Glossary['terms'][number]
type Filter = 'all' | 'review' | 'unseen'

export function Flashcards({ terms }: { terms: Term[] }) {
  const cards = useProgress().cards
  const [filter, setFilter] = useState<Filter>('all')
  const [order, setOrder] = useState<string[]>(() => terms.map((t) => t.id))
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const deck = useMemo(() => {
    const byId = new Map(terms.map((t) => [t.id, t]))
    return order
      .map((id) => byId.get(id))
      .filter((t): t is Term => !!t)
      .filter((t) => (filter === 'review' ? cards[t.id] === 'review' : filter === 'unseen' ? !cards[t.id] : true))
  }, [terms, order, filter, cards])

  const known = terms.filter((t) => cards[t.id] === 'know').length
  const review = terms.filter((t) => cards[t.id] === 'review').length
  const card = deck[Math.min(pos, deck.length - 1)]

  function mark(status: 'know' | 'review') {
    if (!card) return
    progress.setCard(card.id, status)
    setFlipped(false)
    // In filtered views the marked card may drop out of the deck, so the same index shows the next card.
    const leaves = (filter === 'review' && status === 'know') || filter === 'unseen'
    if (!leaves) setPos((p) => (p + 1 < deck.length ? p + 1 : 0))
    else if (pos >= deck.length - 1) setPos(0)
  }

  return (
    <div className="not-prose">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        {(['all', 'unseen', 'review'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f)
              setPos(0)
              setFlipped(false)
            }}
            className={`rounded-full px-3 py-1 font-semibold ${filter === f ? 'bg-navy-900 text-white dark:bg-amber-500 dark:text-navy-900' : 'bg-navy-100 text-navy-800 dark:bg-navy-800 dark:text-navy-100'}`}
          >
            {f === 'all' ? `All (${terms.length})` : f === 'unseen' ? `Not sorted (${terms.length - known - review})` : `Review again (${review})`}
          </button>
        ))}
        <button
          className="rounded-full bg-navy-100 px-3 py-1 font-semibold text-navy-800 dark:bg-navy-800 dark:text-navy-100"
          onClick={() => {
            setOrder((o) => [...o].sort(() => Math.random() - 0.5))
            setPos(0)
            setFlipped(false)
          }}
        >
          🔀 Shuffle
        </button>
        <span className="ml-auto text-navy-600 dark:text-navy-300">✔ Know {known} · ↻ Review {review}</span>
      </div>

      {!card ? (
        <p className="rounded-xl border border-dashed border-navy-300 p-8 text-center text-navy-600 dark:text-navy-300">
          No cards in this pile. Pick another filter above.
        </p>
      ) : (
        <>
          <button
            onClick={() => setFlipped((f) => !f)}
            className="flex min-h-[15rem] w-full flex-col items-center justify-center rounded-2xl border-2 border-navy-200 bg-white p-6 text-center shadow-sm transition hover:border-amber-500 dark:border-navy-700 dark:bg-navy-900"
            aria-label={flipped ? 'Show term' : 'Show definition'}
          >
            {!flipped ? (
              <>
                <span className="text-xs font-bold uppercase tracking-wide text-navy-500 dark:text-navy-300">Term · tap to flip</span>
                <span className="mt-3 text-2xl font-extrabold text-navy-900 dark:text-white">{card.term}</span>
              </>
            ) : (
              <>
                <span className="text-xs font-bold uppercase tracking-wide text-navy-500 dark:text-navy-300">{card.term}</span>
                <span className="mt-3 text-lg text-navy-900 dark:text-navy-100">{card.definition}</span>
                {card.example && <span className="mt-3 text-sm italic text-navy-600 dark:text-navy-300">e.g. {card.example}</span>}
              </>
            )}
          </button>
          <div className="mt-3 flex items-center justify-between gap-2">
            <button className="btn-ghost" onClick={() => { setFlipped(false); setPos((p) => (p > 0 ? p - 1 : deck.length - 1)) }}>
              ← Prev
            </button>
            <span className="text-sm text-navy-600 dark:text-navy-300">
              {Math.min(pos, deck.length - 1) + 1} / {deck.length}
            </span>
            <button className="btn-ghost" onClick={() => { setFlipped(false); setPos((p) => (p + 1 < deck.length ? p + 1 : 0)) }}>
              Next →
            </button>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button className="rounded-xl bg-red-100 py-3 font-bold text-red-800 dark:bg-red-950/50 dark:text-red-200" onClick={() => mark('review')}>
              ↻ Review again
            </button>
            <button className="rounded-xl bg-emerald-100 py-3 font-bold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200" onClick={() => mark('know')}>
              ✔ Know it
            </button>
          </div>
        </>
      )}
    </div>
  )
}
