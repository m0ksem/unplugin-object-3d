import { readFileSync } from 'fs'
import { parseFileName } from '../../utils/filename'
import type { BaseLoader } from './../base-loader'

export const glbLoader: BaseLoader = {
  include: (id: string) => id.endsWith('.glb?three'),
  transform: (source: string, id) => {
    const { path } = parseFileName(id)

    const content = readFileSync(path, { encoding: 'base64' })

    return `import { createThreeObjectFromGlb } from 'unplugin-object-3d/internal/glb-three'

    export default createThreeObjectFromGlb(\`${content}\`)
    `
  },
}
