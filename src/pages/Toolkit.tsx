import { manifest } from '../lib/course'

export default function Toolkit() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold text-navy-950 dark:text-white">Toolkit downloads</h1>
      <p className="mt-2 text-navy-700 dark:text-navy-200">
        Cheat sheets and templates to print or use with clients, and the full course as a PDF book.
      </p>
      {manifest.toolkit.length === 0 ? (
        <p className="card mt-6">
          The 12 toolkit sheets and the PDF book are produced in build phases 6 and 7. Download links will appear here automatically when they exist.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {manifest.toolkit.map((t) => (
            <li key={t.id} className="card flex items-center justify-between gap-3">
              <span className="font-semibold">{t.title}</span>
              <a className="btn-primary" href={`downloads/toolkit/${t.id}.pdf`} download>PDF</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
