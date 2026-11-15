import type { ReactNode } from 'react'

export function Exercise({ minutes, title, children }: { minutes: number; title?: string; children: ReactNode }) {
  return (
    <section className="exercise not-prose my-6 rounded-xl border-2 border-dashed border-navy-300 bg-white p-4 dark:border-navy-600 dark:bg-navy-900">
      <p className="mb-2 flex flex-wrap items-center gap-2 font-bold text-navy-900 dark:text-white">
        <span aria-hidden>🛠️</span> {title ?? 'Your turn'}
        <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-navy-900">{minutes} min</span>
      </p>
      <div className="space-y-2 text-[0.97rem] leading-relaxed text-navy-900 dark:text-navy-100 [&_li]:ml-5 [&_ol>li]:list-decimal [&_strong]:font-semibold [&_ul>li]:list-disc">
        {children}
      </div>
    </section>
  )
}
