import type { ReactNode } from 'react'

export type CalloutType = 'tip' | 'warning' | 'trades' | 'money' | 'changes'

const styles: Record<CalloutType, { icon: string; label: string; cls: string }> = {
  tip: { icon: '💡', label: 'Tip', cls: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40' },
  warning: { icon: '⚠️', label: 'Warning', cls: 'border-red-500 bg-red-50 dark:bg-red-950/40' },
  trades: { icon: '🏗️', label: 'Trades example', cls: 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  money: { icon: '💷', label: 'Money', cls: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
  changes: { icon: '🔄', label: 'Changes fast: check before quoting to clients', cls: 'border-violet-500 bg-violet-50 dark:bg-violet-950/40' },
}

export function Callout({ type = 'tip', title, children }: { type?: CalloutType; title?: string; children: ReactNode }) {
  const s = styles[type]
  return (
    <aside className={`callout not-prose my-6 rounded-r-xl border-l-4 px-4 py-3 ${s.cls}`} data-callout={type}>
      <p className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-navy-900 dark:text-navy-100">
        <span aria-hidden>{s.icon}</span>
        {title ?? s.label}
      </p>
      <div className="callout-body text-[0.97rem] leading-relaxed text-navy-900 dark:text-navy-100 [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-2 [&_strong]:font-semibold [&_ul]:mt-1">
        {children}
      </div>
    </aside>
  )
}
