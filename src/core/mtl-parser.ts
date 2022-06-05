import { exists, normalizePath } from './file-loader'

// Mast be same as in obj.d.ts
const assetKeys = [
  'map_Ka' as const,
  'map_Kd' as const,
  'map_Ks' as const,
  'map_Ns' as const,
  'map_d' as const,
  'map_bump' as const,
  'bump' as const,
  'disp' as const,
  'decal' as const,
]

export type MaterialName = string
export type AssetName = typeof assetKeys[number]
export type Asset = Partial<Record<AssetName, string>>
export type Materials = Record<MaterialName, Asset>

const normalizeMaterialName = (name: string): MaterialName => {
  return name.replace(/\./, '_')
}

/**
 * Parse .mtl file
 * @spec http://paulbourke.net/dataformats/mtl/
 */
export const parseMtl = (code: string, id: string) => {
  const errors: string[] = []

  const materials = code
    .split('newmtl ')
    .slice(1) // Skip empty first line or commets
    .reduce((acc, curr) => {
      const [materialName, ...lines] = curr.split('\n')

      const assets: Asset = {}

      for (let line = 0; line < lines.length; line++) {
        const [key, path] = lines[line].split(' ').filter(Boolean)
        if (assetKeys.includes(key as AssetName)) {
          const relativePath = normalizePath(path, id)
          if (!exists(relativePath)) {
            errors.push(`Can not resolve asset "${path}" in ${id}`)
            continue
          }
          assets[key as AssetName] = relativePath
        }
      }

      acc[normalizeMaterialName(materialName)] = assets

      return acc
    }, {} as Materials)

  return {
    materials,
    errors,
  }
}
