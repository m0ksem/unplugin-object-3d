import type { MTL } from '../parsers/mtl-parser'

const toString = () => 'toString() { return this.raw }'
const raw = (code: string) => `get raw() { return \`${code}\` }`
const materials = (mtl: MTL['materials']) => `materials: ${JSON.stringify(mtl, null, 2)}`
const paths = (paths: MTL['paths']) => `paths: ${JSON.stringify(paths, null, 2)}`

export const generateMtlObject = (mtl: MTL): string => {
  return `{
${materials(mtl.materials)},
${paths(mtl.paths)},
${toString()},
${raw(mtl.raw)},
}`
}

export const generateMtl = (mtls: MTL[]): string => {
  return `[${mtls.map(mtl => generateMtlObject(mtl)).join(',\n')}]`
}
