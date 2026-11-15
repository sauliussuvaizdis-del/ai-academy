import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { completedMinutes, lessonSlug, manifest } from '../lib/course'
import { useProgress } from '../lib/progress'
import { useTheme } from '../lib/theme'
import { ProgressBar } from './ProgressBar'

const NAV = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/glossary', label: 'Glossary & flashcards', icon: '🃏' },
  { to: '/tools', label: 'Calculators', icon: '💷' },
  { to: '/toolkit', label: 'Toolkit downloads', icon: '🧰' },
  { to: '/exam', label: 'Final exam', icon: '🎓' },
  { to: '/progress', label: 'My progress', icon: '📈' },
]

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const loc = useLocation()
  const p = useProgress()
  const pct = completedMinutes(p.completed) / manifest.totalMinutes

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [loc.pathname])

  return (
    <div className="min-h-screen bg-navy-50/50 text-navy-900 dark:bg-navy-950 dark:text-navy-100">
      <header className="sticky top-0 z-30 border-b border-navy-800 bg-navy-900 text-white print:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
          <button className="rounded-lg p-2 hover:bg-navy-800 lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Open menu" aria-expanded={open}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-navy-950">AI</span>
            <span className="hidden sm:inline">Practitioner Academy</span>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <Link to="/search" className="rounded-lg p-2 hover:bg-navy-800" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </Link>
            <button onClick={toggle} className="rounded-lg p-2 hover:bg-navy-800" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        <div className="h-1 bg-navy-800"><div className="h-full bg-amber-500" style={{ width: `${Math.round(pct * 100)}%` }} /></div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-80 max-w-[85vw] overflow-y-auto border-r border-navy-100 bg-white p-4 transition-transform dark:border-navy-800 dark:bg-navy-950 lg:sticky lg:top-[60px] lg:z-0 lg:h-[calc(100vh-60px)] lg:translate-x-0 print:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="mb-4 lg:hidden">
            <ProgressBar value={pct} label="Course complete" />
          </div>
          <nav className="space-y-1">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end className={({ isActive }) => `side-link ${isActive ? 'side-link-active' : ''}`}>
                <span aria-hidden>{n.icon}</span> {n.label}
              </NavLink>
            ))}
          </nav>
          <p className="mb-2 mt-6 px-2 text-xs font-bold uppercase tracking-wide text-navy-500">Modules</p>
          <nav className="space-y-1">
            {manifest.modules.map((m) => {
              const written = m.lessons.filter((l) => l.written)
              const done = m.lessons.filter((l) => p.completed[l.id]).length
              const inThis = loc.pathname.startsWith(`/module/${m.number}`) || m.lessons.some((l) => loc.pathname === `/lesson/${lessonSlug(l.id)}`)
              return (
                <div key={m.number}>
                  <NavLink to={`/module/${m.number}`} className={({ isActive }) => `side-link ${isActive ? 'side-link-active' : ''} ${written.length ? '' : 'opacity-60'}`}>
                    <span className="w-6 shrink-0 text-right font-bold text-navy-400">{m.number}</span>
                    <span className="flex-1">{m.title}</span>
                    {written.length > 0 && <span className="text-xs text-navy-400">{done}/{m.lessons.length}</span>}
                  </NavLink>
                  {inThis && written.length > 0 && (
                    <div className="ml-8 mt-1 space-y-0.5 border-l border-navy-100 pl-2 dark:border-navy-800">
                      {written.map((l) => (
                        <NavLink key={l.id} to={`/lesson/${lessonSlug(l.id)}`} className={({ isActive }) => `block rounded px-2 py-1 text-sm ${isActive ? 'bg-amber-100 font-semibold text-navy-900 dark:bg-amber-900/30 dark:text-amber-100' : 'text-navy-700 hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-navy-900'}`}>
                          {p.completed[l.id] ? '✔ ' : ''}{l.id} {l.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  )
}
