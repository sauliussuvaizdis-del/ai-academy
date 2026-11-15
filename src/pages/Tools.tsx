import { PriceCalculator } from '../components/PriceCalculator'
import { ROICalculator } from '../components/ROICalculator'

export default function Tools() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold text-navy-950 dark:text-white">Calculators</h1>
      <p className="mt-2 text-navy-700 dark:text-navy-200">
        Use these in client meetings. Every figure updates as you type. Lesson 10.2 explains the ROI maths and Lesson 11.2 explains pricing.
      </p>
      <ROICalculator />
      <PriceCalculator />
    </div>
  )
}
