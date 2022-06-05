/* eslint-disable @typescript-eslint/consistent-indexed-object-style */ // Better show materialName in IDE

// Must be same as in ./src/core/mtl-parser.ts
type AssetName = 'map_Ka' | 'map_Kd' | 'map_Ks' | 'map_Ns' | 'map_d' | 'map_bump' | 'bump' | 'disp' | 'decal'

declare module '*.obj' {
  const result: {
    /** Obj file source */
    obj: string
    /** Mtl file source */
    mtl?: string
    /** All textures stored in array */
    textures?: AssetName[]
    /** All textures sorted by material name and texture type: map_Kd, map_Nd etc. */
    materials?: {
      [materialName: string]: {
        [textureName in AssetName]: string
      }
    }
  }
  export default result
}
