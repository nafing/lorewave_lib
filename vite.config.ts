import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const chromiumTarget = 'chrome103'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssTarget: chromiumTarget,
    target: chromiumTarget,
  },
})
