export type Options = Partial<{
  /**
   * Show warning when .obj file missing .mtl or texture
   * @default true
   */
  missingFileWarning: boolean

  /**
   * Use draco loader
   * @default false
   */
  draco: boolean
}>

type AssetName = 'map_Ka' | 'map_Kd' | 'map_Ks' | 'map_Ns' | 'map_d' | 'map_bump' | 'bump' | 'disp' | 'decal'

export interface Obj {
  /** Obj file source */
  obj: string
  /** Mtl */
  mtl?: {
    /** Map of original MTL paths to import paths resolved by bundler */
    paths: Record<string, string>
    /** Map of material name and it maps */
    materials: Record<string, {
      maps: Partial<Record<AssetName, string>>
    }>

    get raw(): string
    toString(): string
  }[]
}

