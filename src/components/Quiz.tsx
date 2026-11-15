import { useEffect, useState } from 'react'
import { loadQuiz } from '../lib/course'
import { progress, useProgress } from '../lib/progress'
import type { Quiz as QuizData } from '../lib/schemas'
import { isCorrect, QuestionCard } from './QuestionCard'

export function Quiz({ id }: { id: string }) {
  const [quiz, setQuiz] = useState<QuizData | null>(null)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [attempt, setAttempt] = useState(0)
  const saved = useProgress().quiz[id]

  useEffect(() => {
    loadQuiz(id).then(setQuiz, (e: Error) => setError(e.message))
  }, [id])

  const total = quiz?.questions.length ?? 0
  const checkedCount = quiz?.questions.filter((q) => checked[q.id]).length ?? 0
  const score = quiz?.questions.filter((q) => checked[q.id] && isCorrect(q, answers[q.id] ?? [])).length ?? 0
  const finished = total > 0 && checkedCount === total

  useEffect(() => {
    if (finished) progress.recordQuiz(id, score, total)
    // record once per finished attempt
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, attempt])

  if (error) return <p className="text-red-600">{error}</p>
  if (!quiz) return <div className="h-32 animate-pulse rounded-xl bg-navy-50 dark:bg-navy-800" />

  return (
    <section className="quiz not-prose my-8" id="quiz">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-xl font-bold text-navy-900 dark:text-white">{quiz.title}</h2>
        {saved && (
          <span className="rounded-full bg-navy-100 px-3 py-1 text-sm font-semibold text-navy-800 dark:bg-navy-800 dark:text-navy-100">
            Best: {saved.best}/{saved.total}
          </span>
        )}
      </div>
      <div className="space-y-4">
        {quiz.questions.map((q, i) => (
          <QuestionCard
            key={`${attempt}-${q.id}`}
            q={q}
            index={i}
            chosen={answers[q.id] ?? []}
            checked={!!checked[q.id]}
            onChange={(c) => setAnswers((a) => ({ ...a, [q.id]: c }))}
            onCheck={() => setChecked((c) => ({ ...c, [q.id]: true }))}
          />
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-navy-900 p-4 text-white dark:bg-navy-800">
        {finished ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-lg font-bold">
              You scored {score} out of {total}
              {score === total ? '. Full marks!' : score / total >= 0.8 ? '. Good work.' : '. Re-read the sections behind the questions you missed, then try again.'}
            </p>
            <button
              className="btn-amber"
              onClick={() => {
                setAnswers({})
                setChecked({})
                setAttempt((a) => a + 1)
              }}
            >
              Try again
            </button>
          </div>
        ) : (
          <p>
            {checkedCount} of {total} answered. Your best score is saved when you finish.
          </p>
        )}
      </div>
    </section>
  )
}
