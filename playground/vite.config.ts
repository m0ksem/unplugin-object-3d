import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from 'unplugin-3d-object/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin(),
  ],
})
