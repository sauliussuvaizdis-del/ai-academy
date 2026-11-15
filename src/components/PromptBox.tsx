import { CopyButton } from './CopyButton'

/** A ready-to-paste prompt with a copy button. */
export function PromptBox({ text, title = 'Prompt to copy' }: { text: string; title?: string }) {
  return (
    <div className="prompt-box not-prose my-3 rounded-xl border border-navy-200 bg-navy-50 dark:border-navy-700 dark:bg-navy-950">
      <div className="flex items-center justify-between gap-2 border-b border-navy-200 px-3 py-1.5 dark:border-navy-700">
        <span className="text-xs font-bold uppercase tracking-wide text-navy-600 dark:text-navy-300">{title}</span>
        <CopyButton text={text} label="Copy" className="rounded-lg px-2 py-1 text-sm font-semibold text-navy-800 hover:bg-navy-100 dark:text-navy-100 dark:hover:bg-navy-800" />
      </div>
      <p className="whitespace-pre-wrap px-3 py-2 font-mono text-[0.85rem] leading-relaxed text-navy-900 dark:text-navy-100">{text}</p>
    </div>
  )
}
