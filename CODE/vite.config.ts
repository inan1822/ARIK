import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base יחסי כדי שהאתר יעבוד גם תחת נתיב-משנה (GitHub Pages: /ARIK/)
  base: './',
})
