import { createUnplugin } from 'unplugin'
import type { MTL } from './core/mtl-parser'
import type { Options } from './types'
import { parseMtl } from './core/mtl-parser'
import { parseObj } from './core/obj-parser'
import { loadFile } from './core/file-loader'
import { generatePlainObjectCode, generateThreeCode } from './core/code-generator'
import { parseFileName } from './utils/filename'
import { loadGlb } from './core/glb-loader'

const defaultOptions: Options = {
  missingFileWarning: true,
}

export default createUnplugin<Partial<Options>>((options = defaultOptions) => ({
  name: 'unplugin-object-3d',
  transformInclude(id) {
    return id.endsWith('.obj') || id.endsWith('.obj?three') || id.endsWith('.glb?three')
  },
  transform(objSource, id) {
    const { path, query, ext } = parseFileName(id)

    if (ext === 'obj') {
      const generateCode = query === 'three' ? generateThreeCode : generatePlainObjectCode

      const { mtlPaths } = parseObj(objSource)

      const mtl = mtlPaths
        .map((mtlPath) => {
          const { source: mtlSource, path: mtlLocation, error } = loadFile(mtlPath, path)

          // Show warn, but let user use only .obj file
          if (error && options.missingFileWarning) { this.warn(error) }
          if (!mtlSource) { return null }

          const { mtl, errors } = parseMtl(mtlSource, mtlLocation)

          // Show warn, but let user use mtl without textures
          if (errors.length && options.missingFileWarning) { errors.forEach(error => this.warn(error)) }

          return mtl
        })
        .filter(m => m != null) as MTL[]

      return generateCode(objSource, mtl)
    }

    if (ext === 'glb') {
      return loadGlb(path)
    }
  },
}))
