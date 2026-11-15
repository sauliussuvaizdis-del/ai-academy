export function NumberField({
  label, value, onChange, prefix, suffix, step = 1, min = 0, hint,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  prefix?: string
  suffix?: string
  step?: number
  min?: number
  hint?: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy-800 dark:text-navy-100">{label}</span>
      <div className="mt-1 flex items-center rounded-lg border border-navy-200 bg-white focus-within:border-amber-500 dark:border-navy-600 dark:bg-navy-950">
        {prefix && <span className="pl-3 text-navy-500">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          className="w-full bg-transparent px-3 py-2 text-navy-900 outline-none dark:text-white"
          value={Number.isFinite(value) ? value : ''}
          step={step}
          min={min}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
        />
        {suffix && <span className="pr-3 text-sm text-navy-500">{suffix}</span>}
      </div>
      {hint && <span className="mt-1 block text-xs text-navy-500 dark:text-navy-400">{hint}</span>}
    </label>
  )
}

export function ResultRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 py-1.5 ${strong ? 'text-lg font-bold' : ''}`}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  )
}
