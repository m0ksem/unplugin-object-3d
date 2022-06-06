export interface Options {
  // define your plugin options here
  warnings: boolean
}

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
  }
}
