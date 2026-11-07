import { existsSync, readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const projectImages = new URL('./public/images/projects/', import.meta.url)
const galleries = Object.fromEntries(
  readdirSync(projectImages, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(({ name }) => [
      name,
      readdirSync(new URL(`${name}/`, projectImages), { withFileTypes: true })
        .filter(file => file.isFile() && /^(cover|preview-\d+)\.svg$/.test(file.name))
        .map(file => file.name)
        .sort((a, b) => a.localeCompare(b, 'en', { numeric: true })),
    ]),
)

const cvDirectory = new URL('./public/cv/', import.meta.url)
const cvFiles = existsSync(cvDirectory)
  ? readdirSync(cvDirectory, { withFileTypes: true }).filter(file => file.isFile()).map(file => file.name)
  : []

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/Portfolio/' : '/',
  define: { __PROJECT_GALLERIES__: JSON.stringify(galleries), __CV_FILES__: JSON.stringify(cvFiles) },
  plugins: [react(), tailwindcss()],
}))
