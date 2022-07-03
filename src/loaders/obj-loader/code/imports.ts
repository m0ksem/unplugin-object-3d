import type { MTL } from '../parsers/mtl-parser'

const normalizeMaterialName = (name: string): string => {
  return name.replace(/\./, '_')
}

const generateImportName = (materialName: string, assetName: string) => `${normalizeMaterialName(materialName)}_${assetName}`

type ImportName = string
type ImportPath = string
type ImportMap = Record<ImportPath, ImportName>

export const generateImportMap = (mtls: MTL[]) => {
  const map: ImportMap = {}

  mtls.forEach((mtl) => {
    Object
      .entries(mtl.materials)
      .forEach(([materialName, assets]) => {
        const maps = assets.maps

        Object
          .entries(maps)
          .forEach(([assetName, path]) => {
            if (!path) { return }
            map[path] = generateImportName(materialName, assetName)
          })
      })
  })

  return map
}

export const generateImports = (map: ImportMap) => {
  return Object
    .keys(map)
    .map(path => `import ${map[path]} from '${path}'`)
    .join('\n')
}

export const replacePathsToImports = (code: string, map: ImportMap) => {
  return Object
    .keys(map)
    .reduce((code, path) => code.split(`"${path}"`).join(map[path]), code)
}
