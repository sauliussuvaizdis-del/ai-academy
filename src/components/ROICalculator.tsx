import { useState } from 'react'
import { calcRoi, gbp, type RoiInput } from '../lib/calc'
import { NumberField, ResultRow } from './NumberField'

const DEFAULTS: RoiInput = { hoursSavedPerWeek: 6, hourlyCost: 25, weeksPerYear: 46, extraRevenuePerMonth: 0, toolCostPerMonth: 60, buildCost: 1500 }

export function ROICalculator({ initial }: { initial?: Partial<RoiInput> }) {
  const [v, setV] = useState<RoiInput>({ ...DEFAULTS, ...initial })
  const r = calcRoi(v)
  const f = (k: keyof RoiInput) => (n: number) => setV((s) => ({ ...s, [k]: n }))
  return (
    <section className="calculator not-prose my-6 rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-700 dark:bg-navy-900">
      <h3 className="mb-3 text-lg font-bold text-navy-900 dark:text-white">💷 ROI calculator</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <NumberField label="Hours saved per week" value={v.hoursSavedPerWeek} onChange={f('hoursSavedPerWeek')} suffix="hrs" step={0.5} />
        <NumberField label="Cost of that time per hour" value={v.hourlyCost} onChange={f('hourlyCost')} prefix="£" hint="Wage plus on-costs, or the owner's own rate" />
        <NumberField label="Working weeks per year" value={v.weeksPerYear} onChange={f('weeksPerYear')} suffix="wks" hint="46 allows for holidays and quiet weeks" />
        <NumberField label="Extra revenue per month (optional)" value={v.extraRevenuePerMonth} onChange={f('extraRevenuePerMonth')} prefix="£" hint="e.g. margin on jobs no longer lost to slow replies" />
        <NumberField label="Tool subscriptions per month" value={v.toolCostPerMonth} onChange={f('toolCostPerMonth')} prefix="£" />
        <NumberField label="One-off build cost" value={v.buildCost} onChange={f('buildCost')} prefix="£" />
      </div>
      <div className="mt-4 rounded-xl bg-navy-900 p-4 text-white">
        <ResultRow label="Benefit per year" value={gbp(r.annualBenefit)} />
        <ResultRow label="Tool costs per year" value={`− ${gbp(r.annualToolCost)}`} />
        <ResultRow label="Build cost" value={`− ${gbp(v.buildCost)}`} />
        <div className="my-1 border-t border-white/20" />
        <ResultRow label="Net gain in year one" value={gbp(r.firstYearNet)} strong />
        <ResultRow label="Return on investment (year one)" value={r.roiPercent === null ? 'n/a' : `${Math.round(r.roiPercent)}%`} />
        <ResultRow
          label="Payback period"
          value={r.paybackMonths === null ? 'Never: costs exceed benefit' : r.paybackMonths < 0.05 ? 'Immediate' : `${r.paybackMonths.toFixed(1)} months`}
          strong
        />
      </div>
      <p className="mt-2 text-xs text-navy-600 dark:text-navy-300">
        Payback = build cost ÷ (monthly benefit − monthly tool costs). Figures are estimates: use the client's own baseline numbers (Module 10).
      </p>
    </section>
  )
}
