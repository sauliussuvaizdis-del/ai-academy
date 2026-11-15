import { MDXProvider } from '@mdx-js/react'
import { useEffect, useState, type ComponentType } from 'react'
import { useParams } from 'react-router-dom'
import { LessonLayout } from '../components/LessonLayout'
import { mdxComponents } from '../components/MdxComponents'
import { findLesson, lessonIdFromSlug, loadLesson } from '../lib/course'
import { progress } from '../lib/progress'
import NotFound from './NotFound'

export default function Lesson() {
  const { slug = '' } = useParams()
  const lesson = findLesson(lessonIdFromSlug(slug))
  const [Content, setContent] = useState<ComponentType | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setContent(null)
    setError('')
    if (!lesson?.path) return
    progress.visit(lesson.id)
    loadLesson(lesson.path).then(
      (mod) => setContent(() => mod.default as ComponentType),
      (e: Error) => setError(e.message),
    )
  }, [lesson?.path, lesson?.id])

  if (!lesson || !lesson.written) return <NotFound message={lesson ? `Lesson ${lesson.id} has not been written yet.` : undefined} />

  return (
    <LessonLayout lesson={lesson} module={lesson.module}>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : Content ? (
        <MDXProvider components={mdxComponents}>
          <Content />
        </MDXProvider>
      ) : (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-5 animate-pulse rounded bg-navy-100 dark:bg-navy-800" />)}
        </div>
      )}
    </LessonLayout>
  )
}
