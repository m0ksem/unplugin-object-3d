import type { MTL } from '../mtl-parser'
import { generateMtl } from './_mtl'
import { generateImportMap, generateImports, replacePathsToImports } from './_imports'

export const generateThreeCode = (obj: string, mtl?: MTL) => {
  if (!mtl) {
    return `import { createThreeObject } from 'unplugin-3d-object/create-three-object'
    
    export defaut createThreeJsObject({
  obj: \`${obj}\`
})`
  }

  const importsMap = generateImportMap(mtl)
  const imports = generateImports(importsMap)
  const mtlCode = replacePathsToImports(generateMtl(mtl), importsMap)

  return `import { createThreeObject } from 'unplugin-3d-object/create-three-object'
${imports}
  
export default createThreeObject({
  obj: \`${obj}\`,
  mtl: ${mtlCode},
})`
}
