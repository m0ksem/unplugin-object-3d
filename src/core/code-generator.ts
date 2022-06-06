import type { MTL } from './mtl-parser'
import { generateMtl } from './code-generator/mtl'
import { generateImportMap, generateImports, replacePathsToImports } from './code-generator/imports'

export const generateCode = (obj: string, mtl?: MTL) => {
  if (!mtl) {
    return `export defaut {
  obj: \`${obj}\`
}`
  }

  const importsMap = generateImportMap(mtl)
  const imports = generateImports(importsMap)
  const mtlCode = replacePathsToImports(generateMtl(mtl), importsMap)

  return `${imports}
  
export default {
  obj: \`${obj}\`,
  mtl: ${mtlCode},
}`
}
