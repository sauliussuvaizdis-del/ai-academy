import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import contentPlugin from './scripts/content-plugin'

export default defineConfig({
  // Relative paths so the built site works in any folder on any static host.
  base: './',
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }]],
      }),
    },
    react({ include: /\.(mdx|tsx|ts)$/ }),
    contentPlugin(),
  ],
  build: {
    chunkSizeWarningLimit: 1500,
  },
})
