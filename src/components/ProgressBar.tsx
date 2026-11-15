export function ProgressBar({ value, label, small }: { value: number; label?: string; small?: boolean }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100)
  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-sm text-navy-700 dark:text-navy-200">
          <span>{label}</span>
          <span className="font-semibold">{pct}%</span>
        </div>
      )}
      <div
        className={`${small ? 'h-1.5' : 'h-2.5'} w-full overflow-hidden rounded-full bg-navy-100 dark:bg-navy-800`}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
