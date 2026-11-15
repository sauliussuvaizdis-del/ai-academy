import { isValidElement, type ReactElement, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Callout } from './Callout'
import { Checklist } from './Checklist'
import { Diagram } from './Diagram'
import { Exercise } from './Exercise'
import { AINestingFigure } from './figures/AINestingFigure'
import { PriceCalculator } from './PriceCalculator'
import { PromptBox } from './PromptBox'
import { ROICalculator } from './ROICalculator'
import { Scenario } from './Scenario'

function Pre({ children }: { children?: ReactNode }) {
  if (isValidElement(children)) {
    const el = children as ReactElement<{ className?: string; children?: ReactNode }>
    if (el.props.className === 'language-mermaid') return <Diagram chart={String(el.props.children ?? '')} />
  }
  return <pre>{children}</pre>
}

function A({ href = '', children }: { href?: string; children?: ReactNode }) {
  // Internal course links are written as /lesson/1-2, /module/3, /tools etc.
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function Table({ children }: { children?: ReactNode }) {
  return (
    <div className="table-wrap -mx-1 overflow-x-auto">
      <table>{children}</table>
    </div>
  )
}

export const mdxComponents = {
  pre: Pre,
  a: A,
  table: Table,
  Callout,
  Checklist,
  Diagram,
  Exercise,
  AINestingFigure,
  ROICalculator,
  PriceCalculator,
  PromptBox,
  Scenario,
}
