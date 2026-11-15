import type { Question } from '../lib/schemas'

export function isCorrect(q: Question, chosen: string[]) {
  const right = q.options.filter((o) => o.correct).map((o) => o.id).sort()
  const picked = [...chosen].sort()
  return right.length === picked.length && right.every((id, i) => id === picked[i])
}

interface Props {
  q: Question
  index: number
  chosen: string[]
  checked: boolean
  onChange: (chosen: string[]) => void
  onCheck?: () => void
  /** Exam mode hides per-question feedback until the end. */
  hideFeedback?: boolean
}

export function QuestionCard({ q, index, chosen, checked, onChange, onCheck, hideFeedback }: Props) {
  const multi = q.type === 'multi'
  const correct = checked && isCorrect(q, chosen)
  const showFeedback = checked && !hideFeedback
  return (
    <fieldset className="rounded-xl border border-navy-200 bg-white p-4 dark:border-navy-700 dark:bg-navy-900">
      <legend className="sr-only">Question {index + 1}</legend>
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-navy-500 dark:text-navy-300">
        Question {index + 1} · {multi ? 'Choose all that apply' : q.type === 'scenario' ? 'Scenario' : 'Choose one'}
      </p>
      {q.scenario && (
        <p className="mb-2 rounded-lg bg-amber-50 p-3 text-[0.95rem] italic text-navy-800 dark:bg-amber-900/20 dark:text-navy-100">{q.scenario}</p>
      )}
      <p className="mb-3 font-semibold text-navy-900 dark:text-white">{q.prompt}</p>
      <div className="space-y-2">
        {q.options.map((o) => {
          const picked = chosen.includes(o.id)
          let ring = 'border-navy-200 dark:border-navy-700'
          if (showFeedback && o.correct) ring = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
          else if (showFeedback && picked && !o.correct) ring = 'border-red-500 bg-red-50 dark:bg-red-950/40'
          else if (picked) ring = 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
          return (
            <div key={o.id}>
              <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${ring} ${checked ? 'cursor-default' : ''}`}>
                <input
                  type={multi ? 'checkbox' : 'radio'}
                  name={`q-${q.id}`}
                  className="mt-1 h-4 w-4 shrink-0 accent-amber-500"
                  checked={picked}
                  disabled={checked}
                  onChange={() => {
                    if (multi) onChange(picked ? chosen.filter((c) => c !== o.id) : [...chosen, o.id])
                    else onChange([o.id])
                  }}
                />
                <span className="text-[0.95rem] text-navy-900 dark:text-navy-100">{o.text}</span>
              </label>
              {showFeedback && (picked || o.correct) && (
                <p className={`ml-2 mt-1 border-l-2 pl-3 text-sm ${o.correct ? 'border-emerald-500 text-emerald-800 dark:text-emerald-300' : 'border-red-400 text-red-800 dark:text-red-300'}`}>
                  {o.correct ? '✔ ' : '✘ '}
                  {o.explanation}
                </p>
              )}
            </div>
          )
        })}
      </div>
      {showFeedback && (
        <details className="mt-3 text-sm text-navy-700 dark:text-navy-200">
          <summary className="cursor-pointer font-semibold">Why each option is right or wrong</summary>
          <ul className="mt-2 space-y-1">
            {q.options.map((o) => (
              <li key={o.id}>
                <span className="font-semibold">{o.correct ? '✔' : '✘'} {o.text}:</span> {o.explanation}
              </li>
            ))}
          </ul>
        </details>
      )}
      {!checked && onCheck && (
        <button
          className="btn-primary mt-3"
          disabled={chosen.length === 0}
          onClick={onCheck}
        >
          Check answer
        </button>
      )}
      {showFeedback && (
        <p className={`mt-3 font-bold ${correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
          {correct ? 'Correct.' : 'Not quite: see the explanations above.'}
        </p>
      )}
    </fieldset>
  )
}
