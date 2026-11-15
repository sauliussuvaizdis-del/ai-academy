import { useState } from 'react'
import { calcPrice, gbp, type PriceInput } from '../lib/calc'
import { NumberField, ResultRow } from './NumberField'

const DEFAULTS: PriceInput = {
  buildHours: 12, dayRate: 450, hoursPerDay: 7.5, contingencyPercent: 15, toolSetupCosts: 0, toolMarkupPercent: 0,
  retainerHoursPerMonth: 2, monthlyToolCosts: 0, vatRegistered: false,
}

export function PriceCalculator({ initial }: { initial?: Partial<PriceInput> }) {
  const [v, setV] = useState<PriceInput>({ ...DEFAULTS, ...initial })
  const r = calcPrice(v)
  const f = (k: keyof PriceInput) => (n: number) => setV((s) => ({ ...s, [k]: n }))
  return (
    <section className="calculator not-prose my-6 rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-700 dark:bg-navy-900">
      <h3 className="mb-3 text-lg font-bold text-navy-900 dark:text-white">🧮 Pricing calculator</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <NumberField label="Build hours (your estimate)" value={v.buildHours} onChange={f('buildHours')} suffix="hrs" step={0.5} />
        <NumberField label="Your day rate" value={v.dayRate} onChange={f('dayRate')} prefix="£" />
        <NumberField label="Billable hours in a day" value={v.hoursPerDay} onChange={f('hoursPerDay')} suffix="hrs" step={0.5} />
        <NumberField label="Contingency on labour" value={v.contingencyPercent} onChange={f('contingencyPercent')} suffix="%" hint="Covers testing surprises and client changes" />
        <NumberField label="One-off tool/setup costs you pay" value={v.toolSetupCosts} onChange={f('toolSetupCosts')} prefix="£" />
        <NumberField label="Markup on tools you resell" value={v.toolMarkupPercent} onChange={f('toolMarkupPercent')} suffix="%" hint="0% if the client pays tools directly" />
        <NumberField label="Retainer hours per month" value={v.retainerHoursPerMonth} onChange={f('retainerHoursPerMonth')} suffix="hrs" step={0.5} />
        <NumberField label="Monthly tool costs you pay for the client" value={v.monthlyToolCosts} onChange={f('monthlyToolCosts')} prefix="£" />
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm font-semibold text-navy-800 dark:text-navy-100">
        <input type="checkbox" className="h-5 w-5 accent-amber-500" checked={v.vatRegistered} onChange={(e) => setV((s) => ({ ...s, vatRegistered: e.target.checked }))} />
        I am VAT registered (adds 20% VAT)
      </label>
      <div className="mt-4 rounded-xl bg-navy-900 p-4 text-white">
        <ResultRow label="Effective hourly rate" value={gbp(r.hourlyRate, 2)} />
        <ResultRow label="Labour" value={gbp(r.labour)} />
        <ResultRow label="Contingency" value={gbp(r.contingency)} />
        <ResultRow label="Tools charged" value={gbp(r.toolsCharged)} />
        <div className="my-1 border-t border-white/20" />
        <ResultRow label="Build price (ex VAT)" value={gbp(r.buildPriceExVat)} strong />
        {v.vatRegistered && <ResultRow label="Build price inc. VAT" value={gbp(r.buildPriceIncVat)} />}
        <ResultRow label="Monthly retainer (ex VAT)" value={gbp(r.retainerExVat)} strong />
        {v.vatRegistered && <ResultRow label="Monthly retainer inc. VAT" value={gbp(r.retainerIncVat)} />}
        <ResultRow label="First-year client value (ex VAT)" value={gbp(r.firstYearValueExVat)} />
      </div>
      <p className="mt-2 text-xs text-navy-600 dark:text-navy-300">
        This prices on time. Module 11 shows how to sense-check it against the value to the client. Round the result to a clean fixed price.
      </p>
    </section>
  )
}
