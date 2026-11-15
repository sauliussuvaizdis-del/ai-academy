import { progress, useProgress } from '../lib/progress'
import { ProgressBar } from './ProgressBar'

export function Checklist({ id, title, items }: { id: string; title?: string; items: string[] }) {
  const p = useProgress()
  const state = p.checklists[id] ?? {}
  const done = items.filter((_, i) => state[String(i)]).length
  return (
    <section className="checklist not-prose my-6 rounded-xl border border-navy-200 bg-white p-4 dark:border-navy-700 dark:bg-navy-900">
      <p className="mb-2 font-bold text-navy-900 dark:text-white">✅ {title ?? 'Build checklist'}</p>
      <ProgressBar value={items.length ? done / items.length : 0} label={`${done} of ${items.length} steps`} small />
      <ol className="mt-3 space-y-1">
        {items.map((item, i) => {
          const checked = !!state[String(i)]
          return (
            <li key={i}>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-navy-50 dark:hover:bg-navy-800">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-amber-500"
                  checked={checked}
                  onChange={(e) => progress.setCheck(id, String(i), e.target.checked)}
                />
                <span className={`text-[0.97rem] ${checked ? 'text-navy-400 line-through' : 'text-navy-900 dark:text-navy-100'}`}>
                  <span className="mr-1 font-semibold">{i + 1}.</span>
                  {item}
                </span>
              </label>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
