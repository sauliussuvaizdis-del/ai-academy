import { useEffect, useId, useState } from 'react'
import { useIsDark } from '../lib/theme'

let mermaidPromise: Promise<typeof import('mermaid').default> | null = null
function getMermaid() {
  mermaidPromise ??= import('mermaid').then((m) => m.default)
  return mermaidPromise
}

/** Renders a Mermaid diagram. Mermaid is only downloaded on pages that use one. */
export function Diagram({ chart, caption }: { chart: string; caption?: string }) {
  const dark = useIsDark()
  const id = 'mmd' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const [svg, setSvg] = useState<string>('')
  const [naturalWidth, setNaturalWidth] = useState(0)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    getMermaid()
      .then(async (mermaid) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: dark ? 'dark' : 'base',
          fontFamily: 'Inter, system-ui, sans-serif',
          themeVariables: dark
            ? { primaryColor: '#223663', primaryTextColor: '#e8ecf5', lineColor: '#94a9d1', primaryBorderColor: '#5f7bb3' }
            : { primaryColor: '#e3e9f5', primaryTextColor: '#14213d', lineColor: '#3d5a96', primaryBorderColor: '#3d5a96', secondaryColor: '#fff8e6', tertiaryColor: '#f2f5fb' },
          flowchart: { htmlLabels: true, curve: 'basis' },
        })
        const { svg } = await mermaid.render(id + (dark ? 'd' : 'l'), chart.trim())
        if (!cancelled) {
          const vb = /viewBox="[-\d.]+ [-\d.]+ ([\d.]+)/.exec(svg)
          setNaturalWidth(vb ? Number(vb[1]) : 0)
          setSvg(svg)
        }
      })
      .catch((e: unknown) => !cancelled && setError(e instanceof Error ? e.message : String(e)))
    return () => {
      cancelled = true
    }
  }, [chart, dark, id])

  return (
    <figure className="diagram not-prose my-6">
      <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white p-3 dark:border-navy-700 dark:bg-navy-900">
        {error ? (
          <pre className="whitespace-pre-wrap text-sm text-red-600">Diagram error: {error}</pre>
        ) : svg ? (
          <div
            className="mermaid-svg mx-auto flex justify-center [&_svg]:h-auto [&_svg]:max-w-full"
            // Wide diagrams keep a readable size on phones and scroll sideways instead of shrinking.
            style={naturalWidth > 480 ? { minWidth: `${Math.min(naturalWidth, 560)}px` } : undefined}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="h-40 animate-pulse rounded bg-navy-50 dark:bg-navy-800" aria-label="Loading diagram" />
        )}
      </div>
      {naturalWidth > 480 && (
        <p className="mt-1 text-center text-xs text-navy-500 sm:hidden print:hidden" aria-hidden>
          ← swipe to see the whole diagram →
        </p>
      )}
      {caption && <figcaption className="mt-2 text-center text-sm text-navy-600 dark:text-navy-300">{caption}</figcaption>}
    </figure>
  )
}
