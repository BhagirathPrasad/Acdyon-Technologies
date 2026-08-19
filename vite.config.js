import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use an explicit env flag when building for GitHub Pages so other hosts
  // (Vercel/Netlify) keep a root-relative asset path.
  base: process.env.GH_PAGES === 'true' ? '/Acdyon-Technologies/' : '/',
})
