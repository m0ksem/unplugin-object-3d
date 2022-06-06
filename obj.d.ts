/* eslint-disable @typescript-eslint/consistent-indexed-object-style */ // Better show materialName in IDE

// Must be same as in ./src/core/mtl-parser.ts
type AssetName = 'map_Ka' | 'map_Kd' | 'map_Ks' | 'map_Ns' | 'map_d' | 'map_bump' | 'bump' | 'disp' | 'decal'

declare module '*.obj' {
  const result: {
    /** Obj file source */
    obj: string
    /** Mtl */
    mtl?: {
      /** Map of original MTL paths to import paths resolved by bundler */
      paths: Record<string, string>
      /** Map of material name and it maps */
      materials: {
        [materialName: string]: {
          maps: Partial<Record<AssetName, string>>
        }
      }

      get raw(): string
      toString(): string
    }
  }
  export default result
}

declare module '*.obj?three' {
  const mesh: import('three').Group
  export default mesh
}
