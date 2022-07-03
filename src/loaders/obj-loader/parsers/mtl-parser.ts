import type { Obj } from '../../../types'
import { createNonExisitingFile, exists, normalizePath } from './file-loader'

// Mast be same as in obj.d.ts
const assetKeys = [
  'map_ka',
  'map_kd',
  'map_ks',
  'map_ns',
  'map_d',
  'map_bump',
  'bump',
  'disp',
  'decal',
]

export type MTL = NonNullable<Obj['mtl']>[number]

/**
 * Parse .mtl file
 * @spec http://paulbourke.net/dataformats/mtl/
 */
export const parseMtl = (code: string, id: string) => {
  const errors: string[] = []

  const paths: MTL['paths'] = {}

  const materials: MTL['materials'] = code
    .split('newmtl ')
    .slice(1) // Skip empty first line or commets
    .reduce((acc, curr) => {
      const [materialName, ...lines] = curr.split('\n')

      const maps: MTL['materials'][string]['maps'] = {}

      for (let line = 0; line < lines.length; line++) {
        const [key, ...pathParts] = lines[line].split(' ').filter(Boolean)
        if (!key || !pathParts) { continue }

        const path = pathParts.join(' ')

        if (assetKeys.includes(key.toLocaleLowerCase())) {
          const relativePath = normalizePath(path, id)
          if (!exists(relativePath)) {
            errors.push(createNonExisitingFile(path, id))
            continue
          }
          maps[key as keyof MTL['materials'][string]['maps']] = relativePath
          paths[path] = relativePath
        }
      }

      acc[materialName] = { maps }

      return acc
    }, {} as MTL['materials'])

  const mtl: MTL = {
    materials,
    paths,
    toString() { return this.raw },
    get raw() { return code },
  }

  return { mtl, errors }
}
