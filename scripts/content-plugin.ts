// Vite plugin: exposes the course manifest and search index as virtual modules
// and reloads the page when anything in /content changes.
import type { Plugin } from 'vite'
import { buildManifest, buildSearchIndex, CONTENT } from './lib/content'

const MANIFEST = 'virtual:course'
const SEARCH = 'virtual:search'

export default function contentPlugin(): Plugin {
  return {
    name: 'course-content',
    resolveId(id) {
      if (id === MANIFEST || id === SEARCH) return '\0' + id
    },
    load(id) {
      if (id === '\0' + MANIFEST) return `export default ${JSON.stringify(buildManifest())}`
      if (id === '\0' + SEARCH) return `export default ${JSON.stringify(buildSearchIndex())}`
    },
    configureServer(server) {
      server.watcher.add(CONTENT)
      server.watcher.on('all', (_e, file) => {
        if (!file.startsWith(CONTENT)) return
        for (const v of [MANIFEST, SEARCH]) {
          const mod = server.moduleGraph.getModuleById('\0' + v)
          if (mod) server.moduleGraph.invalidateModule(mod)
        }
        server.ws.send({ type: 'full-reload' })
      })
    },
  }
}
