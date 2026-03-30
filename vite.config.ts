import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const chromiumTarget = 'chrome103'
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserOrOrgPages = repositoryName?.endsWith('.github.io')
const base =
  process.env.VITE_BASE_PATH ??
  (process.env.GITHUB_ACTIONS && repositoryName
    ? isUserOrOrgPages
      ? '/'
      : `/${repositoryName}/`
    : '/')

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  build: {
    cssTarget: chromiumTarget,
    target: chromiumTarget,
  },
})
