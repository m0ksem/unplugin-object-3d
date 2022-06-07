import type { MTL } from '../mtl-parser'
import { generateMtl } from './_mtl'
import { generateImportMap, generateImports, replacePathsToImports } from './_imports'

export const generatePlainObjectCode = (obj: string, mtl?: MTL[]) => {
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
