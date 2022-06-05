import { createUnplugin } from 'unplugin'
import { parseMtl } from './core/mtl-parser'
import type { Options } from './types'
import { parseObj } from './core/obj-parser'
import { loadFile } from './core/file-loader'
import { generateCode } from './core/code-generator'

export default createUnplugin<Options>(() => ({
  name: 'unplugin-3d-object',
  transformInclude(id) {
    return id.endsWith('.obj')
  },
  transform(objSource, id) {
    const { mtlPath } = parseObj(objSource)

    if (!mtlPath) {
      return generateCode(objSource)
    }

    const { source: mtlSource, path: mtlLocation, error } = loadFile(mtlPath, id)

    // Show warn, but let user use only .obj file
    if (error) { this.warn(error) }
    if (!mtlSource) { return generateCode(objSource) }

    const { materials, errors } = parseMtl(mtlSource, mtlLocation)

    // Show warn, but let user use mtl without textures
    if (errors.length) { errors.forEach(error => this.warn(error)) }

    if (Object.keys(materials).length === 0) {
      return generateCode(objSource, mtlSource)
    }

    return generateCode(objSource, mtlSource, materials)
  },
}))
