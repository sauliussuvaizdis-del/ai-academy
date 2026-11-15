import { manifest } from '../lib/course'

export default function Exam() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold text-navy-950 dark:text-white">Final exam</h1>
      <p className="mt-2 text-navy-700 dark:text-navy-200">
        60 questions from every module, an optional {manifest.examMinutes}-minute timer, a 75% pass mark and a printable certificate.
      </p>
      <p className="card mt-6">The exam is written in build phase 6, once all the modules it tests exist. It will appear on this page automatically.</p>
    </div>
  )
}
