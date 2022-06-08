import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Object3d from 'unplugin-object-3d/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Object3d(),
  ],
})
