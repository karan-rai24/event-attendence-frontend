import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const apiProxy = {
  target: 'http://localhost:8000',
  changeOrigin: true,
  bypass(req: { headers: { accept?: string } }) {
    // Let browser navigation requests (HTML) fall through to SPA
    if (req.headers.accept?.includes('text/html')) {
      return '/index.html'
    }
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/dist/**', '**/node_modules/**', '**/.git/**'],
    },
    proxy: {
      '/auth': apiProxy,
      '/events': apiProxy,
      '/registrations': apiProxy,
      '/attendance': apiProxy,
      '/certificates': apiProxy,
      '/health': apiProxy,
    },
  },
})
