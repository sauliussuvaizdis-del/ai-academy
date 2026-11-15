/** Concept graphic: AI contains machine learning, which contains deep learning, which contains LLMs. */
const RINGS = [
  { r: 150, cy: 160, label: 'Artificial intelligence', fill: 'fill-navy-100 dark:fill-navy-900', text: 'fill-navy-900 dark:fill-navy-100' },
  { r: 115, cy: 195, label: 'Machine learning', fill: 'fill-navy-200 dark:fill-navy-800', text: 'fill-navy-900 dark:fill-navy-100' },
  { r: 80, cy: 230, label: 'Deep learning', fill: 'fill-navy-400 dark:fill-navy-600', text: 'fill-white' },
  { r: 45, cy: 265, label: 'LLMs', fill: 'fill-amber-500', text: 'fill-navy-950' },
]

const LEGEND = [
  { label: 'Artificial intelligence', text: 'Any computer system doing tasks we associate with human thinking.', swatch: 'bg-navy-100 dark:bg-navy-900' },
  { label: 'Machine learning', text: 'Learns patterns from examples instead of hand-written rules.', swatch: 'bg-navy-200 dark:bg-navy-800' },
  { label: 'Deep learning', text: 'Machine learning using large, many-layered neural networks.', swatch: 'bg-navy-400 dark:bg-navy-600' },
  { label: 'LLMs', text: 'Deep-learning models trained on text: the engines inside Claude, ChatGPT and Gemini.', swatch: 'bg-amber-500' },
]

export function AINestingFigure() {
  return (
    <figure className="figure not-prose my-6">
      <svg viewBox="0 0 340 320" className="mx-auto w-full max-w-sm" role="img" aria-labelledby="ainest-title ainest-desc">
        <title id="ainest-title">How AI, machine learning, deep learning and LLMs fit together</title>
        <desc id="ainest-desc">Four nested circles. The outer circle is artificial intelligence. Inside it is machine learning, inside that is deep learning, and the innermost circle is large language models.</desc>
        {RINGS.map((g) => (
          <circle key={g.label} cx={170} cy={g.cy} r={g.r} className={`${g.fill} stroke-navy-500 dark:stroke-navy-400`} strokeWidth={1.5} />
        ))}
        {RINGS.map((g) => {
          const core = g.label === 'LLMs'
          return (
            <text key={g.label + 't'} x={170} y={core ? g.cy + 6 : g.cy - g.r + 36} textAnchor="middle" fontSize={core ? 17 : 15} fontWeight={700} className={g.text}>
              {g.label}
            </text>
          )
        })}
      </svg>
      <dl className="mx-auto mt-3 max-w-md space-y-2 text-sm">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-start gap-2">
            <span className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full border border-navy-400 ${l.swatch}`} aria-hidden />
            <div>
              <dt className="inline font-bold text-navy-900 dark:text-white">{l.label}: </dt>
              <dd className="inline text-navy-700 dark:text-navy-200">{l.text}</dd>
            </div>
          </div>
        ))}
      </dl>
      <figcaption className="mt-3 text-center text-sm text-navy-600 dark:text-navy-300">
        Each circle is a specialised part of the one around it. The tools you will sell sit in the amber core.
      </figcaption>
    </figure>
  )
}
