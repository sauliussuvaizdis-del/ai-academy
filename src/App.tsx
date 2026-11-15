import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Module from './pages/Module'
import NotFound from './pages/NotFound'

const Glossary = lazy(() => import('./pages/Glossary'))
const Tools = lazy(() => import('./pages/Tools'))
const Toolkit = lazy(() => import('./pages/Toolkit'))
const Exam = lazy(() => import('./pages/Exam'))
const Progress = lazy(() => import('./pages/Progress'))
const Search = lazy(() => import('./pages/Search'))

export default function App() {
  return (
    <HashRouter>
      <AppShell>
        <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-navy-100 dark:bg-navy-900" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/module/:n" element={<Module />} />
            <Route path="/lesson/:slug" element={<Lesson />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppShell>
    </HashRouter>
  )
}
