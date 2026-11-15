import { useEffect, useState } from 'react'
import { loadScenario } from '../lib/course'
import type { Scenario as ScenarioData } from '../lib/schemas'
import { CopyButton } from './CopyButton'

interface Step {
  node: string
  choice?: number
}

export function Scenario({ id }: { id: string }) {
  const [data, setData] = useState<ScenarioData | null>(null)
  const [error, setError] = useState('')
  const [steps, setSteps] = useState<Step[]>([])

  useEffect(() => {
    loadScenario(id).then(
      (d) => {
        setData(d)
        setSteps([{ node: d.start }])
      },
      (e: Error) => setError(e.message),
    )
  }, [id])

  if (error) return <p className="text-red-600">{error}</p>
  if (!data) return <div className="h-40 animate-pulse rounded-xl bg-navy-50 dark:bg-navy-800" />

  const current = steps[steps.length - 1]
  const node = data.nodes[current.node]
  const answered = steps.slice(0, -1)
  const score = answered.reduce((s, st) => s + (data.nodes[st.node].choices?.[st.choice!]?.points ?? 0), 0)
  const max = answered.length * 2
  const ended = !!node?.end || !node?.choices?.length
  const debrief = [...data.debrief].sort((a, b) => b.minScore - a.minScore).find((d) => max === 0 || score / max >= d.minScore)

  return (
    <section className="scenario not-prose my-6 rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-700 dark:bg-navy-900">
      <header className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wide text-navy-500 dark:text-navy-300">Role-play</p>
        <h3 className="text-lg font-bold text-navy-900 dark:text-white">{data.title}</h3>
        <p className="mt-1 text-sm text-navy-700 dark:text-navy-200">
          <strong>{data.persona.name}</strong>, {data.persona.business}. {data.persona.background}
        </p>
        <p className="mt-1 text-sm text-navy-700 dark:text-navy-200"><strong>Your goal:</strong> {data.goal}</p>
      </header>

      <ol className="space-y-3">
        {steps.map((st, i) => {
          const n = data.nodes[st.node]
          const picked = st.choice !== undefined ? n.choices?.[st.choice] : undefined
          return (
            <li key={i} className="space-y-2">
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-navy-100 px-4 py-2 text-navy-900 dark:bg-navy-800 dark:text-navy-100">
                <span className="block text-xs font-bold">{data.persona.name}</span>
                {n.owner}
              </div>
              {picked && (
                <>
                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-amber-100 px-4 py-2 text-navy-900 dark:bg-amber-900/40 dark:text-amber-50">
                    <span className="block text-xs font-bold">You</span>
                    {picked.text}
                  </div>
                  <p className="text-sm italic text-navy-600 dark:text-navy-300">{picked.reaction}</p>
                </>
              )}
            </li>
          )
        })}
      </ol>

      {!ended && node.choices && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold text-navy-800 dark:text-navy-100">How do you reply?</p>
          {node.choices.map((c, i) => (
            <button
              key={i}
              className="block w-full rounded-xl border border-navy-200 p-3 text-left text-[0.95rem] text-navy-900 hover:border-amber-500 dark:border-navy-700 dark:text-navy-100"
              onClick={() => setSteps((s) => [...s.slice(0, -1), { ...current, choice: i }, { node: c.next }])}
            >
              {c.text}
            </button>
          ))}
        </div>
      )}

      {ended && (
        <div className="mt-5 space-y-3 rounded-xl bg-navy-50 p-4 dark:bg-navy-800">
          <p className="font-bold text-navy-900 dark:text-white">
            Coaching feedback: {score} of {max} points
          </p>
          {debrief && <p className="text-navy-800 dark:text-navy-100">{debrief.message}</p>}
          <ul className="space-y-2 text-sm">
            {answered.map((st, i) => {
              const c = data.nodes[st.node].choices![st.choice!]
              return (
                <li key={i} className="border-l-2 border-amber-500 pl-3 text-navy-800 dark:text-navy-100">
                  <strong>{['Weak', 'OK', 'Strong'][c.points]} reply:</strong> {c.coaching}
                </li>
              )
            })}
          </ul>
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary" onClick={() => setSteps([{ node: data.start }])}>Start again</button>
            <CopyButton text={data.practisePrompt} label="🎭 Practise with Claude (copy prompt)" className="btn-amber" />
          </div>
          <p className="text-xs text-navy-600 dark:text-navy-300">
            Paste the copied prompt into a new chat at claude.ai to play the same owner live, with unscripted replies.
          </p>
        </div>
      )}
    </section>
  )
}
