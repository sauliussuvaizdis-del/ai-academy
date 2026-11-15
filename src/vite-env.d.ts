/// <reference types="vite/client" />

declare module 'virtual:course' {
  // Typed as Manifest in src/lib/course.ts
  const manifest: unknown
  export default manifest
}

declare module 'virtual:search' {
  const index: { kind: 'lesson' | 'term'; id: string; title: string; text: string }[]
  export default index
}

declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const Component: ComponentType<{ components?: Record<string, unknown> }>
  export const frontmatter: Record<string, unknown>
  export default Component
}
