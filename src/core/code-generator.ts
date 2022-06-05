import type { Materials } from './mtl-parser'

const generateImportName = (materialName: string, assetName: string) => `${materialName}_${assetName}`

const generateImportsCode = (materials: Materials) => Object
  .entries(materials)
  .map(([materialName, asset]) => {
    if (Object.keys(asset).length === 0) { return '' }

    return Object
      .entries(asset)
      .map(([assetName, path]) => {
        return `import ${generateImportName(materialName, assetName)} from '${path}'`
      })
  })
  .filter(Boolean)
  .flat()
  .join('\n')

const generateTexturesCode = (materials: Materials) => Object
  .entries(materials)
  .map(([materialName, asset]) => {
    return Object
      .keys(asset)
      .map(assetName => generateImportName(materialName, assetName))
  })
  .flat()
  .join(', ')

const generateMaterialsCode = (materials: Materials) => {
  const importsMap = {} as Record<string, string>

  Object
    .entries(materials)
    .forEach(([materialName, assets]) => {
      Object
        .entries(assets)
        .forEach(([assetName, path]) => {
          importsMap[path] = generateImportName(materialName, assetName)
        })
    })

  // Create JSON object from materials and replace all paths to import names
  return Object
    .keys(importsMap)
    .reduce((code, path) => code.replace(`"${path}"`, importsMap[path]), JSON.stringify(materials, null, 2))
}

export const generateCode = (obj: string, mtl?: string, materials?: Materials) => {
  if (!mtl) {
    return `export defaut {
  obj: \`${obj}\`
}`
  }

  if (!materials) {
    return `export default {
  obj: \`${obj}\`,
  mtl: \`${mtl}\`,
}`
  }

  return `${generateImportsCode(materials)}
export default {
  obj: \`${obj}\`,
  mtl: \`${mtl}\`,
  textures: [${generateTexturesCode(materials)}],
  materials: ${generateMaterialsCode(materials)},
}`
}
