import { Link } from 'react-router-dom'

export default function NotFound({ message }: { message?: string }) {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <p className="text-5xl">🧭</p>
      <h1 className="mt-4 text-2xl font-extrabold text-navy-950 dark:text-white">{message ?? 'Page not found'}</h1>
      <Link to="/" className="btn-primary mt-6 inline-block">Back to the dashboard</Link>
    </div>
  )
}
