import { parseFileName } from '../../utils/filename'
import type { BaseLoader } from '../base-loader'
import { generateThreeCode } from './code/three'
import { loadFile } from './parsers/file-loader'
import { parseMtl } from './parsers/mtl-parser'
import type { MTL } from './parsers/mtl-parser'
import { parseObj } from './parsers/obj-parser'

export const objLoader: BaseLoader = {
  include(id) {
    return id.endsWith('.obj?three')
  },
  transform(source, id, options) {
    const { mtlPaths } = parseObj(source)
    const { path } = parseFileName(id)

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

    return generateThreeCode(source, mtl)
  },
}
