import type { MTL } from '../parsers/mtl-parser'
import { generateMtl } from './mtl'
import { generateImportMap, generateImports, replacePathsToImports } from './imports'

export const generateThreeCode = (obj: string, mtl?: MTL[]) => {
  if (!mtl) {
    return `import { createThreeObject } from 'unplugin-object-3d/internal/obj-three'
    
    export defaut createThreeObjectFromObj({
  obj: \`${obj}\`
})`
  }

  const importsMap = generateImportMap(mtl)
  const imports = generateImports(importsMap)
  const mtlCode = replacePathsToImports(generateMtl(mtl), importsMap)

  return `import { createThreeObjectFromObj } from 'unplugin-object-3d/internal/obj-three'
${imports}
  
export default createThreeObjectFromObj({
  obj: \`${obj}\`,
  mtl: ${mtlCode},
})`
}
