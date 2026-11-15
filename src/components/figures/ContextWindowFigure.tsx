/** Concept graphic: the context window as the desk the model works at. */
const BLOCKS = [
  { label: 'Instructions', sub: 'system prompt: the job description', cls: 'fill-navy-700 dark:fill-navy-500', text: 'fill-white', h: 46 },
  { label: 'Your documents', sub: 'price list, handbook, enquiry', cls: 'fill-amber-500', text: 'fill-navy-950', h: 62 },
  { label: 'Conversation so far', sub: 'every message, both sides', cls: 'fill-navy-300 dark:fill-navy-700', text: 'fill-navy-950 dark:fill-white', h: 62 },
  { label: 'Room for the answer', sub: 'the reply also uses tokens', cls: 'fill-white dark:fill-navy-950', text: 'fill-navy-700 dark:fill-navy-200', h: 46, dashed: true },
]

export function ContextWindowFigure() {
  let y = 52
  return (
    <figure className="figure not-prose my-6">
      <svg viewBox="0 0 340 380" className="mx-auto w-full max-w-sm" role="img" aria-labelledby="ctx-title ctx-desc">
        <title id="ctx-title">The context window</title>
        <desc id="ctx-desc">
          A box labelled context window contains, from top to bottom: instructions, your documents, the conversation so far, and room for the answer. Outside the box, the model cannot see the
          client's other files. Separately, training knowledge is fixed at the training cutoff date.
        </desc>
        <rect x={10} y={10} width={210} height={300} rx={14} className="fill-navy-50 stroke-navy-500 dark:fill-navy-900 dark:stroke-navy-400" strokeWidth={2} />
        <text x={115} y={36} textAnchor="middle" fontSize={14} fontWeight={800} className="fill-navy-900 dark:fill-white">Context window</text>
        {BLOCKS.map((b) => {
          const top = y
          y += b.h + 8
          return (
            <g key={b.label}>
              <rect x={24} y={top} width={182} height={b.h} rx={8} className={`${b.cls} stroke-navy-400`} strokeWidth={b.dashed ? 1.5 : 0} strokeDasharray={b.dashed ? '5 4' : undefined} />
              <text x={115} y={top + b.h / 2 - 3} textAnchor="middle" fontSize={13} fontWeight={700} className={b.text}>{b.label}</text>
              <text x={115} y={top + b.h / 2 + 13} textAnchor="middle" fontSize={10} className={b.text}>{b.sub}</text>
            </g>
          )
        })}
        <g className="fill-navy-600 dark:fill-navy-300">
          {[0, 1, 2].map((i) => (
            <rect key={i} x={240 + i * 6} y={60 + i * 6} width={70} height={52} rx={4} className="fill-white stroke-navy-400 dark:fill-navy-900" strokeWidth={1.2} />
          ))}
          <text x={290} y={140} textAnchor="middle" fontSize={11} fontWeight={700} className="fill-navy-800 dark:fill-navy-100">Everything else</text>
          <text x={290} y={155} textAnchor="middle" fontSize={10}>not on the desk:</text>
          <text x={290} y={169} textAnchor="middle" fontSize={10}>the model can't</text>
          <text x={290} y={183} textAnchor="middle" fontSize={10}>see it</text>
        </g>
        <rect x={10} y={326} width={320} height={44} rx={10} className="fill-navy-900 dark:fill-navy-700" />
        <text x={170} y={344} textAnchor="middle" fontSize={12} fontWeight={700} className="fill-amber-400">Training: long-term general knowledge</text>
        <text x={170} y={360} textAnchor="middle" fontSize={10.5} className="fill-white">fixed at the training cutoff date; not your business</text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-navy-600 dark:text-navy-300">
        The model answers from its training plus whatever is on the desk right now. If the desk is full, something has to come off.
      </figcaption>
    </figure>
  )
}
