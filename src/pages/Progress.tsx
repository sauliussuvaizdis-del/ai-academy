import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { completedMinutes, formatMinutes, manifest } from '../lib/course'
import { progress, useProgress } from '../lib/progress'

export default function Progress() {
  const p = useProgress()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const done = completedMinutes(p.completed)

  function download() {
    const blob = new Blob([progress.export()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-academy-progress-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMsg({ ok: true, text: 'Progress file downloaded. Keep it somewhere safe, such as Google Drive.' })
  }

  async function upload(file: File) {
    const result = progress.import(await file.text())
    setMsg(result.ok ? { ok: true, text: 'Progress restored.' } : { ok: false, text: result.error })
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold text-navy-950 dark:text-white">My progress</h1>
      <div className="card mt-4">
        <ProgressBar value={done / manifest.totalMinutes} label={`${formatMinutes(done)} of ${formatMinutes(manifest.totalMinutes)}`} />
      </div>

      <h2 className="mb-2 mt-8 text-xl font-bold">By module</h2>
      <div className="overflow-x-auto rounded-xl border border-navy-100 dark:border-navy-800">
        <table className="w-full text-sm">
          <thead className="bg-navy-100 text-left dark:bg-navy-900">
            <tr><th className="p-2">Module</th><th className="p-2">Lessons</th><th className="p-2">Quiz scores (best)</th></tr>
          </thead>
          <tbody>
            {manifest.modules.map((m) => {
              const scores = [
                ...m.lessons.filter((l) => l.quiz && p.quiz[l.quiz]).map((l) => `${l.id}: ${p.quiz[l.quiz!].best}/${p.quiz[l.quiz!].total}`),
                ...(m.quiz && p.quiz[m.quiz] ? [`Module: ${p.quiz[m.quiz].best}/${p.quiz[m.quiz].total}`] : []),
              ]
              return (
                <tr key={m.number} className="border-t border-navy-100 dark:border-navy-800">
                  <td className="p-2"><Link className="underline" to={`/module/${m.number}`}>{m.number}. {m.title}</Link></td>
                  <td className="p-2 whitespace-nowrap">{m.lessons.filter((l) => p.completed[l.id]).length}/{m.lessons.length}</td>
                  <td className="p-2">{scores.length ? scores.join(' · ') : '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <h2 className="mb-2 mt-8 text-xl font-bold">Back up or move your progress</h2>
      <p className="text-navy-700 dark:text-navy-200">
        Progress is stored in this browser only. Export it to a file to keep a backup, or to carry it to another phone or computer and import it there.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button className="btn-primary" onClick={download}>⬇ Export progress</button>
        <button className="btn-ghost" onClick={() => fileRef.current?.click()}>⬆ Import progress</button>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = '' }} />
        <button
          className="btn-ghost !text-red-700 dark:!text-red-300"
          onClick={() => { if (window.confirm('Delete all progress on this device? This cannot be undone unless you exported a backup.')) { progress.reset(); setMsg({ ok: true, text: 'Progress reset.' }) } }}
        >
          Reset
        </button>
      </div>
      {msg && <p className={`mt-3 font-semibold ${msg.ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>{msg.text}</p>}
    </div>
  )
}
