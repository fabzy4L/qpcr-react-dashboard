import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Deployed as a subdirectory of the personal site: fabzy4l.github.io/qpcr/
  // Set here rather than passed to `vite build`, because Git Bash rewrites a
  // leading-slash --base into a Windows path.
  base: '/qpcr/',
  plugins: [react()],
})
